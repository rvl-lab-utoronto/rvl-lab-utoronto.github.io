import React, { Component } from 'react';
import './publicationEntry.css';
import useCollapse from 'react-collapsed';

export default function PublicationEntry(props) {
  let extraParams = {
    pdf: 'pdf',
    html: 'pdf',
    bibtex: 'bibtex',
    video: 'video',
    project: 'project',
    code: 'code',
  };

  const { getCollapseProps, getToggleProps } = useCollapse();
  let thumbnail = <></>;

  if (props.publication['pdf'] && props.publication['thumbnail']) {
    thumbnail = (
      <a href={props.publication['pdf']}>
        <img
          className="publication-thumbnail"
          alt={props.publication['title']}
          src={'../' + props.publication['thumbnail']}
        />
      </a>
    );
  } else if (props.publication['html'] && props.publication['thumbnail']) {
    thumbnail = (
      <a href={props.publication['html']}>
        <img
          className="publication-thumbnail"
          alt={props.publication['title']}
          src={'../' + props.publication['thumbnail']}
        />
      </a>
    );
  } else if (props.publication['thumbnail']) {
    thumbnail = (
      <img
        className="publication-thumbnail"
        alt={props.publication['title']}
        src={'../' + props.publication['thumbnail']}
      />
    );
  }

  return (
    <div className="publication-entry">
      {props.showYear ? (
        <div>
          <hr />
          <h2>{props.publication['year']}</h2>
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div className="desktop-view">
          <div style={{ paddingRight: '25px' }}>{thumbnail}</div>
        </div>
        <div>
          <h3>{props.publication['title']}</h3>
          <p>{props.publication['author']}</p>
          {props.publication['booktitle'] && (
            <p>
              <span>{props.publication['booktitle']}</span>
            </p>
          )}
          {props.publication['journal'] && (
            <p>
              <span>{props.publication['journal']}</span>
            </p>
          )}
          {props.publication['tags'] && (
            <div>
              {props.publication['tags'].map((tag) => (
                <PublicationTag
                  key={`${props.publication.id}-${tag}`}
                  tag={tag}
                  selected={props.selectedTags.includes(tag)}
                  addSelectedTag={props.addSelectedTag}
                  removeSelectedTag={props.removeSelectedTag}
                />
              ))}
            </div>
          )}
          <div style={{ marginLeft: '-3px', marginTop: '3px' }}>
            {Object.keys(extraParams).map((key) => {
              if (props.publication[key]) {
                if (key === 'bibtex') {
                  return (
                    <div
                      key={`${props.publication.id}-${key}`}
                      style={{ display: 'inline', marginLeft: '3px' }}
                      {...getToggleProps()}
                    >
                      [
                      <div className="a" style={{ display: 'inline' }}>
                        bibtex
                      </div>
                      ]
                    </div>
                  );
                } else if (key === 'pdf') {
                  return (
                    <div
                      key={`${props.publication.id}-${key}`}
                      style={{ display: 'inline', marginLeft: '3px' }}
                    >
                      [
                      <a href={'../' + props.publication[key]}>
                        {extraParams[key]}
                      </a>
                      ]
                    </div>
                  );
                }
                return (
                  <div
                    key={`${props.publication.id}-${key}`}
                    style={{ display: 'inline', marginLeft: '3px' }}
                  >
                    [
                    <a href={props.publication[key]}>{extraParams[key]}</a>
                    ]
                  </div>
                );
              }
              return null; // Return null instead of empty fragment
            })}
          </div>
          <div {...getCollapseProps()}>
            <div className="bibtex-expand">{props.publication['bibtex']}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export class PublicationTag extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.selected ?? false };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected !== prevProps.selected) {
      this.setState({ selected: this.props.selected });
    }
  }

  onClick = () => {
    if (!this.state.selected) {
      this.props.addSelectedTag(this.props.tag);
    } else {
      this.props.removeSelectedTag(this.props.tag);
    }
    this.setState({ selected: !this.state.selected });
  };

  render() {
    return (
      <div
        onClick={this.onClick}
        className={
          'publication-tag ' + (this.state.selected ? 'publication-tag-selected' : '')
        }
      >
        {this.props.tag}
      </div>
    );
  }
}
