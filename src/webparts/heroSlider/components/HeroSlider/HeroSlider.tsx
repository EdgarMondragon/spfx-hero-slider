import * as React from 'react';
import { HeroSliderProps } from './HeroSliderProps';
import { HeroSliderState } from './HeroSliderState';
import { Controls } from '../Controls/index';
import Slide from '../Slide/Slide';
import Nav from '../Nav/Nav';
import { ComponentStatus } from '../../models/ComponentStatus';
import styles from './HeroSlider.module.scss';


export default class HeroSlider extends React.Component<HeroSliderProps, HeroSliderState> {

  constructor(props: HeroSliderProps){
    super(props);

    this.state = {
      slides: [],
      currentIndex: 0,
      componentStatus: ComponentStatus.Loading,
    }
  }

  public componentDidMount(): void {
    const { slidesLimit, dataProvider, contentTypeName } = this.props;  

    dataProvider
      .getSlides(contentTypeName)
      .then(result => {
        if (result.length === 0) {
          return this.setState({
            componentStatus: ComponentStatus.Error,
          });
        }

        this.setState({
          slides: result.slice(0, slidesLimit),
          componentStatus: ComponentStatus.Completed,
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          componentStatus: ComponentStatus.Error,
        });
      });
  }

  private nextSlide = () =>{
    console.log("Next Slide")
  };

  private prevSlide = () =>{
    console.log("Prev Slide")
  };

  public render(): React.ReactElement<HeroSliderProps> {
    const {
      slides,
      currentIndex,
    }= this.state
    return (
    <div className={ styles.slider }>
      <Controls goNext={this.nextSlide} goPrevious={ this.prevSlide}>

      </Controls>
      {slides.map((slide, index) => (
          <Slide key={slide.id} isActive={currentIndex === index} {...slide} />
        ))} 
    </div>
    );
  }
}
