import React, { useMemo } from 'react';
import TextInput from '../components/textInput';
import { dataPublications } from '../data/publications.js';
import PublicationEntry, { PublicationTag } from '../components/publicationEntry';
import PageHeader from '../components/pageHeader';
import { useSearchParams } from 'react-router-dom';
import { parsePublications, getAllTags, filterPublications } from '../util/parsePublications';

const allPublications = parsePublications(dataPublications);
const allTags = getAllTags(allPublications);

// Shared links use JSON-encoded values: ?tags=["a","b"]&search="term"
function readParam(searchParams, key, isValid) {
  const raw = searchParams.get(key);
  if (raw === null) return undefined;
  try {
    const value = JSON.parse(raw);
    return isValid(value) ? value : undefined;
  } catch {
    return undefined;
  }
}

function Publications() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm =
    readParam(searchParams, 'search', (v) => typeof v === 'string') ?? searchParams.get('search') ?? '';
  const selectedTags = readParam(searchParams, 'tags', (v) => Array.isArray(v)) ?? [];

  const updateFilters = (nextSearchTerm, nextSelectedTags) => {
    const next = {};
    if (nextSelectedTags.length !== 0) next.tags = JSON.stringify(nextSelectedTags);
    if (nextSearchTerm !== '') next.search = JSON.stringify(nextSearchTerm);
    setSearchParams(next, { replace: true });
  };

  const addSelectedTag = (tag) => {
    if (!selectedTags.includes(tag)) updateFilters(searchTerm, [...selectedTags, tag]);
  };

  const removeSelectedTag = (tag) => {
    updateFilters(searchTerm, selectedTags.filter((t) => t !== tag));
  };

  const tagsKey = JSON.stringify(selectedTags);
  const shownPublications = useMemo(
    () => filterPublications(allPublications, searchTerm, JSON.parse(tagsKey)),
    [searchTerm, tagsKey]
  );

  let previousYear = '';

  return (
    <div className="center">
      <div className="horizontal-padding max-width">
        <PageHeader showBreak={false} title="Publications">
          <div style={{ marginRight: '30px' }}>
            <TextInput
              value={searchTerm}
              onChange={(newSearchTerm) => updateFilters(newSearchTerm, selectedTags)}
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
        {shownPublications.map((publication) => {
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
