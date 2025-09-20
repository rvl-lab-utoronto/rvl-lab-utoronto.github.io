import React,{Component} from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import chevronDown from "../assets/buttons/expand_more.svg";
import styles from "../components/faq.module.css";
import {postdocFAQ, gradFAQ, undergraduateFAQ, visitorFAQ} from "../data/joining-faq.js"


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
research. You will be part of a large, vibrant and healthy community. To learn more about the research at RVL 
check out our <a href='https://rvl.cs.toronto.edu/research'>lab's research</a>, 
our <a href='https://rvl.cs.toronto.edu/publications'>publications</a>, and 
this <a href='https://github.com/rvl-lab-utoronto/lab_onboarding_recommended_reading'>recommended reading list</a> for 
new and prospective students. Note that you do not need to be interested in all of these areas, but at least one. 
</p>

<h3>Email policy</h3>
<p>I welcome emails from prospective students, however, I might not be able to answer your email. 
I reply to messages from prospective students who seem like a good fit for my lab and I encourage them to apply. 
If I haven't replied to your message, it is probably because I don't see a strong fit with my lab's research.
</p>

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
