import React, { Component } from "react";
import ShortUrlForm from "./components/ShortUrlForm";
import axios from "axios";
import Result from './components/Result';

class App extends Component {
  state = {
    originalUrl: '',
    shortUrl: '',
    toastShow: false,
  };

  toggleToast = () => this.setState((prevState) => ({ toastShow: !prevState.toastShow }))

  //Responsible for saving the task
  handleShorten = async () => {
    console.log(process.env.REACT_APP_BACKEND_URL)
    const { originalUrl } = this.state
    try {
      this.setState({
        shortUrl: ''
      })
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/shorturls/save/", { original_url: originalUrl });
      this.setState({
        shortUrl: response.data.short_url
      })
    } catch (error) {
      alert(error.message)
    }
  };

  onSubmit = () => {
    const { originalUrl } = this.state;

    if (!originalUrl || !this.isUrlValid()) {
      this.toggleToast()
      return
    }
    this.handleShorten()
  }

  onChangeOriginalUrl = text => {
    this.setState({ originalUrl: text })
  }

  isUrlValid = () => {
    const { originalUrl } = this.state;
    const res = originalUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return !!res;
  }

  render() {
    const { shortUrl, toastShow } = this.state
    return (
      <main className="content">
        {!shortUrl && (
          <ShortUrlForm
            originalUrl={this.state.originalUrl}
            onSave={this.onSubmit}
            onChange={this.onChangeOriginalUrl}
            toastShow={toastShow}
            toggleToast={this.toggleToast}
          />
        )}
        {!!shortUrl && (
          <Result shortUrl={this.state.shortUrl} originalUrl={this.state.originalUrl} />
        )}
      </main>
    )
  }
}

export default App;
