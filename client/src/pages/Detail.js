import React from 'react';
import API from '../utils/API';

class Detail extends React.Component {
  state = {
    detail: {},
  };

  componentDidMount() {
    API.getBook(this.props.match.params.id).then(d =>
      this.setState({ detail: d.data })
    );
  }

  render() {
    return <div>{JSON.stringify(this.state.detail)}</div>;
  }
}

export default Detail;