import React,{Component} from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "../assets/buttons/expand_more.svg";
import styles from "../components/faq.module.css";
import {joiningIntro, postdocFAQ, gradFAQ, undergraduateFAQ, visitorFAQ} from "../data/joining-faq.js"


/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <img className={styles.chevron} src={chevronDown} alt="Chevron Down" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({ isEnter }) =>
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
    }}
    contentProps={{ className: styles.itemContent }}
    panelProps={{ className: styles.itemPanel }}
  />
);

export default class Joining extends Component {
  constructor(props) {
    super(props)
    this.state = {readme: ""}
  }
  render(){
    return(
      <div className="center">
          <div className="horizontal-padding max-width">

	      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{joiningIntro}</ReactMarkdown>

	      <h3>FAQ for prospective postdocs</h3>
	      <div className={styles.accordion}>
          {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
		        <Accordion transition transitionTimeout={250} allowMultiple>
	              {postdocFAQ.map((qa, index)=>{
	                  return <AccordionItem key={index} header={qa.question}><ReactMarkdown rehypePlugins={[rehypeRaw]}>{qa.answer}</ReactMarkdown></AccordionItem>
                })}
            </Accordion>
        </div>

        <h3>FAQ for prospective MSc and PhD students</h3>
	      <div className={styles.accordion}>
          {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
		        <Accordion transition transitionTimeout={250} allowMultiple>
	              {gradFAQ.map((qa, index)=>{
	                  return <AccordionItem key={index} header={qa.question}><ReactMarkdown rehypePlugins={[rehypeRaw]}>{qa.answer}</ReactMarkdown></AccordionItem>
                })}
            </Accordion>
        </div>

        <h3>FAQ for prospective undergraduate students</h3>
	      <div className={styles.accordion}>
          {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
		        <Accordion transition transitionTimeout={250} allowMultiple>
	              {undergraduateFAQ.map((qa, index)=>{
	                  return <AccordionItem key={index} header={qa.question}><ReactMarkdown rehypePlugins={[rehypeRaw]}>{qa.answer}</ReactMarkdown></AccordionItem>
                })}
            </Accordion>
        </div>
        
        <h3>FAQ for prospective visiting students</h3>
	      <div className={styles.accordion}>
          {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
		        <Accordion transition transitionTimeout={250} allowMultiple>
	              {visitorFAQ.map((qa, index)=>{
	                  return <AccordionItem key={index} header={qa.question}><ReactMarkdown rehypePlugins={[rehypeRaw]}>{qa.answer}</ReactMarkdown></AccordionItem>
                })}
            </Accordion>
        </div>
	    
        </div>
      </div>
    )
  }
}
