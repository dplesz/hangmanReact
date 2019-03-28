import React, {Component} from 'react';

class submitLetterForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  render() {
    return (
        <form onSubmit={this.submit}>
          <input ref='_letter'
                 type='text'
                 maxlength='1'
                 autofocus='autofocus'/>
          <input type='submit'
                 value='guess'/>
        </form>
    );
  }

}
