import React,{Component} from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "../assets/buttons/expand_more.svg";
import styles from "../components/faq.module.css";
import {dataFAQ} from "../data/joining-faq.js"


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

	      <h2>Prospective students</h2>
	      <p>I am always looking for excellent students and researchers at all levels: postdocs, PhD, MSc, and
undergraduates with computer science or engineering backgrounds. Our lab is an intellectually
vibrant and a socially inclusive environment, and I enjoy working closely with my students, both
graduate and undergraduate. When you join RVL, you will also have the opportunity to closely interact
with my colleagues at the UofT CS Robotics Group as well as their students. We have very active
members and weekly reading groups, as well as state-of-the-art facilities for robotics
research. You will be part of a large, vibrant and healthy community.</p>

	      <h2>How to join the lab: FAQ</h2>
	      <div className={styles.accordion}>
        {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
		  <Accordion transition transitionTimeout={250} allowMultiple>

	  {dataFAQ.map((qa)=>{
	      return <AccordionItem header={qa.question}><ReactMarkdown rehypePlugins={[rehypeRaw]}>{qa.answer}</ReactMarkdown>
	  </AccordionItem>
          })}

		      
        </Accordion>
      </div>

	    
        </div>
      </div>
    )
  }
}
