import * as React from 'react';
import { WithContext as ReactTags, ReactTagsProps } from 'react-tag-input'

import './bookCategoryTags.css'

declare module 'react-tag-input' {
  interface ReactTagsProps {
    inputValue?: string
  }
}

type BookCategoryTagsProps = {
  tags: string[]
  partialCategoryTag: string
  updateTags: (tags: string[]) => any
  updatePartialTag: (partial: string) => any
}
type TagType = { id: number, text: string };

export class BookCategoryTags extends React.Component<BookCategoryTagsProps> {

  private tags: string[]
  private tagRef: React.RefObject<ReactTags>;

  constructor(props: BookCategoryTagsProps) {
    super(props);
    this.state = { tags: props.tags.map(tag => { return { id: tag, text: tag } }) };
    this.tagRef = React.createRef();
  }

  componentDidMount() {
    // nasty hack, as there is a 'query' property in ReactTags which is not updated from props.inputValue
    // need to simulate a keystroke
    if (this.tagRef.current) 
      this.tagRef.current['child'].handleChange({ target: { value: this.props.partialCategoryTag || '' } })
  }

  stringsToTagTypes = (tagStrings: string[]) => {
    return tagStrings.map((tag) => { return { id: tag, text: tag } })
  }

  sendNewTags = (newTags: TagType[]) => {
    this.props.updateTags(newTags.map(tag => tag.text));
  }

  handleDelete = (i: number) => {
    let newTags = this.props.tags.filter((tag, index) => index !== i);
    this.props.updateTags(newTags);
  }

  handleAddition = (tag: TagType) => {
    let newTags = [...this.props.tags, tag.text];
    this.props.updateTags(newTags);
  }


  handleDrag = (tag: TagType, currPos, newPos) => {
    const newTags = this.props.tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag.text);
    this.props.updateTags(newTags);
  }

  render() {
    return <div>
      <ReactTags autofocus={false}
        placeholder='Add new category'
        tags={this.stringsToTagTypes(this.props.tags) as any}
        handleAddition={this.handleAddition as any}
        handleDelete={this.handleDelete}
        inputValue={this.props.partialCategoryTag}
        handleInputChange={this.props.updatePartialTag}
        ref={this.tagRef}
      /** handleDrag={this.handleDrag} mobile chrome breaks */
      />
    </div>
  }
}