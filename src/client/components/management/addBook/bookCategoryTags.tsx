import * as React from 'react';
import { WithContext as ReactTags, ReactTagsProps } from 'react-tag-input'

type BookCategoryTagsProps = {
  tags: string[]
  updateTags: (tags: string[]) => any
}
type TagType = { id: string, text: string };

type BookCategoryTagsState = {
  tags: TagType[]
}


export class BookCategoryTags extends React.Component<BookCategoryTagsProps, BookCategoryTagsState> {

  private tags: string[]

  constructor(props: BookCategoryTagsProps) {
    super(props);
    this.state = { tags: props.tags.map(tag => { return { id: tag, text: tag } }) };
  }

  public componentWillReceiveProps(nextProps: BookCategoryTagsProps) {
    this.setState({ tags: nextProps.tags.map(tag => { return { id: tag, text: tag } }) });
  }

  sendNewTags = (newTags: TagType[]) => {
    this.props.updateTags(newTags.map(tag => tag.text));
  }

  handleDelete = (i: number) => {
    let newTags = this.state.tags.filter((tag, index) => index !== i);
    this.setState({
      tags: newTags
    });
    this.sendNewTags(newTags);
  }

  handleAddition = (tag: TagType) => {
    let newTags = [...this.state.tags, tag];
    this.setState({ tags: newTags });
    this.sendNewTags(newTags);
  }


  handleDrag = (tag, currPos, newPos) => {
    const newTags = this.state.tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    this.setState({ tags: newTags });
    this.sendNewTags(newTags);
  }

  render() {
    return <div>
      <ReactTags
        tags={this.state.tags as any}
        handleAddition={this.handleAddition as any}
        handleDelete={this.handleDelete}
        handleDrag={this.handleDrag}
      />
    </div>
  }
}