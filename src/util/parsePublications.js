// Shared by the Publications page and scripts/generate-route-pages.mjs, so it must stay
// free of JSX and of imports other than npm packages.
import bibtexParse from 'bibtex-parse-js';

function convertAuthorList(bibtexAuthorList) {
  if (!bibtexAuthorList.toLowerCase().includes(' and ')) {
    return bibtexAuthorList;
  }
  let authors = bibtexAuthorList.split(/ and /gi);
  let authorsOut = '';
  for (let i = 0; i < authors.length; i++) {
    if (i === authors.length - 1) {
      authorsOut = authorsOut + ' and ' + authors[i];
    } else {
      authorsOut = authorsOut + authors[i] + ', ';
    }
  }
  return authorsOut;
}

function cleanupBibEntry(bibtexPassed) {
  let bibtex = bibtexPassed;
  bibtex = bibtex.replaceAll('{{', '{');
  bibtex = bibtex.replaceAll('}}', '}');
  bibtex = bibtex.replace(/\s+/g, ' ');
  bibtex = bibtex.replaceAll(' = ', '=');
  bibtex = bibtex.replaceAll(' =', '=');
  bibtex = bibtex.replaceAll('= ', '=');
  bibtex = bibtex.replaceAll('"{', '{');
  bibtex = bibtex.replaceAll('}"', '}');
  bibtex = bibtex.replaceAll('\n', '');

  const bibtexLower = bibtex.toLowerCase();

  let attributesToFormat = ['title', 'author', 'year', 'booktitle', 'journal'];
  for (let i = 0; i < attributesToFormat.length; i++) {
    let stringToFind = ', ' + attributesToFormat[i] + '={';
    let indexStart = bibtexLower.indexOf(stringToFind);
    let indexEnd = indexStart + stringToFind.length;

    if (indexStart === -1) {
      continue;
    } else {
      bibtex = bibtex.replace(
        bibtex.substring(indexStart, indexEnd),
        bibtex.substring(indexStart, indexEnd).toLowerCase()
      );
    }
  }

  return bibtex;
}

function parseEntry(entry) {
  const parsed = bibtexParse.toJSON(cleanupBibEntry(entry['bibtex']))[0];
  if (!parsed?.entryTags) {
    throw new Error('no BibTeX entry found');
  }
  const tags = parsed.entryTags;
  const title = tags['title'] ?? '';
  return {
    ...entry,
    tags: entry['tags'] ?? [],
    title,
    author: convertAuthorList(tags['author'] ?? ''),
    year: tags['year'] ?? '',
    booktitle: tags['booktitle'] ?? '',
    journal: tags['journal'] ?? '',
    id: `pub-${title}`,
  };
}

// Malformed entries are skipped (and logged) so one bad paste can't take down the site.
// With { strict: true } (used at build time) they throw instead, naming the entry.
export function parsePublications(dataPublications, { strict = false } = {}) {
  const publications = [];
  for (const entry of dataPublications) {
    try {
      publications.push(parseEntry(entry));
    } catch (error) {
      const firstLine = String(entry?.['bibtex'] ?? '').trim().split('\n')[0];
      const message = `Could not parse publication "${firstLine}": ${error?.message ?? error}`;
      if (strict) {
        throw new Error(message);
      }
      console.error(message);
    }
  }

  publications.sort((a, b) => {
    let textA = a['booktitle'].toUpperCase();
    let textB = b['booktitle'].toUpperCase();
    return textA > textB ? -1 : textA < textB ? 1 : 0;
  });
  publications.sort((a, b) => {
    let yearA = a['year'].toUpperCase();
    let yearB = b['year'].toUpperCase();
    return yearA > yearB ? -1 : yearA < yearB ? 1 : 0;
  });
  return publications;
}

export function getAllTags(publications) {
  const allTags = [...new Set(publications.flatMap((publication) => publication['tags']))];
  allTags.sort((a, b) => {
    let textA = a.toUpperCase();
    let textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return allTags;
}

export function filterPublications(publications, searchTerm, selectedTags) {
  const term = searchTerm.toLowerCase();
  return publications.filter((publication) => {
    const tagMatch =
      selectedTags.length === 0 || publication['tags'].some((tag) => selectedTags.includes(tag));
    if (!tagMatch) return false;
    if (term === '') return true;
    return ['title', 'author', 'booktitle', 'journal'].some((key) =>
      publication[key].toLowerCase().includes(term)
    );
  });
}
