import React,{Component} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { dataSlideshow } from '../data/slideshow';

export class Slideshow extends Component {
  render(){
    return (
      <Carousel infiniteLoop children={false} labels={false} showStatus={false} showThumbs={false} emulateTouch
          renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
            hasPrev && (
              <div style={{cursor:"pointer", position:"absolute", zIndex:1, top:"50%", transform:"translateY(-50%)", left:"10px", opacity:"0.7", backgroundColor:"white", borderRadius:"30px", width:"30px", height:"30px", display:"flex", justifyContent:"center", alignItems:"center"}} onClick={clickHandler}>
                <img alt="previous" style={{height:"20px", width:"20px", paddingRight:"2px"}} src={require('../assets/buttons/caret-left-solid.svg').default}/>
              </div>
            )
        }
        renderArrowNext={(clickHandler, hasNext, labelNext) =>
          hasNext && (
            <div style={{cursor:"pointer", position:"absolute", zIndex:1, top:"50%", transform:"translateY(-50%)", right:"10px", opacity:"0.7", backgroundColor:"white", borderRadius:"30px", width:"30px", height:"30px", display:"flex", justifyContent:"center", alignItems:"center"}} onClick={clickHandler}>
              <img alt="next" style={{height:"20px", width:"20px", paddingLeft:"2px"}} src={require('../assets/buttons/caret-right-solid.svg').default}/>
            </div>
          )
        }>
          {dataSlideshow.map((item)=>{
            return <img style={{borderRadius:"7px"}} src={process.env.PUBLIC_URL+"/"+item} alt={"slideshow"}/>
          })}
      </Carousel>
  );
  }
}