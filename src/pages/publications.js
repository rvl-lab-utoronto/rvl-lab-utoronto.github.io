import React, { useState, useEffect } from 'react';
import TextInput from '../components/textInput';
import { dataPublications } from '../data/publications.js';
import PublicationEntry, { PublicationTag } from '../components/publicationEntry';
import PageHeader from '../components/pageHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import bibtexParse from 'bibtex-parse-js';

// Utility functions
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

function getAllTags(publications) {
  let allTags = [];
  for (let i = 0; i < publications.length; i++) {
    if (publications[i]['tags'] !== undefined) {
      for (let j = 0; j < publications[i]['tags'].length; j++) {
        if (!allTags.includes(publications[i]['tags'][j])) {
          allTags.push(publications[i]['tags'][j]);
        }
      }
    }
  }
  allTags.sort(function (a, b) {
    let textA = a.toUpperCase();
    let textB = b.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return allTags;
}

function Publications() {
  const [publications, setPublications] = useState([]);
  const [shownPublications, setShownPublications] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPublications = async () => {
      let publicationsList = [];
      for (let i = 0; i < dataPublications.length; i++) {
        let publication = { ...dataPublications[i] };
        let publicationJSON = bibtexParse.toJSON(
          cleanupBibEntry(dataPublications[i]['bibtex'])
        )[0];
        publication['title'] = publicationJSON['entryTags']?.['title'] ?? '';
        publication['author'] = convertAuthorList(
          publicationJSON['entryTags']?.['author'] ?? ''
        );
        publication['year'] = publicationJSON['entryTags']?.['year'] ?? '';
        publication['booktitle'] = publicationJSON['entryTags']?.['booktitle'] ?? '';
        publication['journal'] = publicationJSON['entryTags']?.['journal'] ?? '';
        publication['id'] = `pub-${publication.title}`;
        publicationsList.push(publication);
      }

      // Sort publications by booktitle and year
      publicationsList.sort((a, b) => {
        let textA = a['booktitle'].toUpperCase();
        let textB = b['booktitle'].toUpperCase();
        return textA > textB ? -1 : textA < textB ? 1 : 0;
      });
      publicationsList.sort((a, b) => {
        let yearA = a['year'].toUpperCase();
        let yearB = b['year'].toUpperCase();
        return yearA > yearB ? -1 : yearA < yearB ? 1 : 0;
      });

      let tags = getAllTags(publicationsList);
      setPublications(publicationsList);
      setShownPublications(publicationsList);
      setAllTags(tags);

      let params = queryString.parse(location.search);
      if (params['tags'] !== undefined || params['search'] !== undefined) {
        if (params['tags'] !== undefined) {
          setSelectedTags(JSON.parse(params['tags']));
        }
        if (params['search'] !== undefined) {
          setSearchTerm(JSON.parse(params['search']));
        }
      }
    };

    fetchPublications();
  }, [location.search]);

  useEffect(() => {
    filterPublications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedTags, publications]);

  const filterPublications = () => {
    if (searchTerm === '' && selectedTags.length === 0) {
      setShownPublications(publications);
      navigate({
        search: '?' + new URLSearchParams({}).toString(),
      });
      return;
    }

    if (selectedTags.length !== 0 && searchTerm === '') {
      navigate({
        search: '?' + new URLSearchParams({ tags: JSON.stringify(selectedTags) }).toString(),
      });
    } else if (selectedTags.length === 0 && searchTerm !== '') {
      navigate({
        search: '?' + new URLSearchParams({ search: JSON.stringify(searchTerm) }).toString(),
      });
    } else {
      navigate({
        search:
          '?' +
          new URLSearchParams({
            tags: JSON.stringify(selectedTags),
            search: JSON.stringify(searchTerm),
          }).toString(),
      });
    }

    let publicationsOut = [];
    for (let i = 0; i < publications.length; i++) {
      let added = false;
      for (let j = 0; j < publications[i]['tags'].length; j++) {
        if (
          selectedTags.includes(publications[i]['tags'][j]) ||
          selectedTags.length === 0
        ) {
          if (searchTerm === '') {
            publicationsOut.push(publications[i]);
            added = true;
          } else if (
            publications[i]['title'].toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            publicationsOut.push(publications[i]);
            added = true;
          } else if (
            publications[i]['author'].toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            publicationsOut.push(publications[i]);
            added = true;
          } else if (
            publications[i]['booktitle']
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            publicationsOut.push(publications[i]);
            added = true;
          } else if (
            publications[i]['journal'].toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            publicationsOut.push(publications[i]);
            added = true;
          }
        }
        if (added) break;
      }
    }
    setShownPublications(publicationsOut);
  };

  const addSelectedTag = (tag) => {
    setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
  };

  const removeSelectedTag = (tag) => {
    setSelectedTags((prevSelectedTags) => prevSelectedTags.filter((t) => t !== tag));
  };

  let previousYear = '';

  return (
    <div className="center">
      <div className="horizontal-padding max-width">
        <PageHeader showBreak={false} title="Publications">
          <div style={{ marginRight: '30px' }}>
            <TextInput
              value={searchTerm}
              onChange={(newSearchTerm) => {
                setSearchTerm(newSearchTerm);
              }}
              placeholder="Search title, author name, or publication venue"
            />
          </div>
          {allTags.length > 0 ? (
            <div>
              {allTags.map((tag) => (
                <PublicationTag
                  key={tag}
                  tag={tag}
                  addSelectedTag={addSelectedTag}
                  removeSelectedTag={removeSelectedTag}
                  selected={selectedTags.includes(tag)}
                />
              ))}
            </div>
          ) : null}
        </PageHeader>
        {shownPublications.map((publication, index) => {
          let showYear = false;
          if (publication['year'] !== previousYear) {
            previousYear = publication['year'];
            showYear = true;
          }
          return (
            <PublicationEntry
              key={publication.id}
              showYear={showYear}
              publication={publication}
              selectedTags={selectedTags}
              addSelectedTag={addSelectedTag}
              removeSelectedTag={removeSelectedTag}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Publications;


