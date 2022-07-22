import React,{Component} from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default class Joining extends Component {
  constructor(props) {
    super(props)
    this.state = {readme: ""}
  }
  async componentDidMount(){
    const file = await import("../data/joining.md")
    console.log(file)
    const response = await fetch(file.default);
    console.log(response)
    const text = await response.text();
    this.setState({
      readme: text
    })
  }
  render(){
    if(this.state.readme===""){
      return <div/>
    }
    return(
      <div className="center">
        <div className="horizontal-padding max-width">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{this.state.readme}</ReactMarkdown>
        </div>
      </div>
    )
  }
}