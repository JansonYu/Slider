import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
@withStyles(s)
class Slider extends Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    const {children, data, scrollWidth=1200, boxHeight=180} = this.props
    const sliderData = children || data || []
    return (
      <div className={s.uxSlider}>
          <div className={s.ul} style={{width:`${scrollWidth/75}rem`}}>
              {
                children ? children : sliderData.map((item, index) => {
                  return (
                    <a href={item.link} tartet="_blank" className={s.li} key={`slider-${index}`} style={{width: `${638/75}rem`,height: `${180/75}rem`, marginRight: `${24/75}rem`}}>
                        <img src={item.picUrl} alt={item.name} />
                    </a>
                  )
                })
              }
          </div>
      </div>
    )
    }
}

Slider.propTypes = {
    scrollWidth: PropTypes.number.isRequired,
    sliderData: PropTypes.array,
    data: PropTypes.array,
}


export default Slider;
