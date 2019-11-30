import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';
@withStyles(s)
class Slider extends Component {
  constructor(props) {
    super(props);
    this.sliderInterval = null
    this.state = {
      isNaving: false, //点击控制
      sliderIndex: 0,
    }
  }
  // 左右切换
  navHandle (direction) {
    const { isNaving, leftItemNum } = this.state
    const { stepNum=1, children, showItemNum } = this.props
    if(!isNaving){
      this.setState((preState, props) => ({
        isNaving: true,
        sliderIndex: direction == 'right' ? preState.sliderIndex + 1 : preState.sliderIndex - 1
      }))
      setTimeout(() => {
        this.setState({
          isNaving: false,
        })
      },200)
    }
  }
  // 清除定时器
  clearSliderInterval () {
    clearInterval(this.sliderInterval)
  }
  // 重新开始定时器
  startSliderInterval() {
    let {autoRun, intervalTime} = this.props
    if (autoRun !== undefined && autoRun !== false) {
      this.clearSliderInterval()
      this.sliderInterval = setInterval(() => {
        switch (autoRun) {
          case 'right':
            this.navHandle('right')
            break
          case 'left':
            this.navHandle('left')
            break
          default:
            return false
        }
      }, intervalTime)
    }
  }
  // 判断用户是否正在浏览当前页面
  onVisibilityChanged (e) {
    let hidden = e.target.hidden
    if (hidden) {
      clearInterval(this.sliderInterval)
    } else {
      this.startSliderInterval()
    }
  }
  componentDidMount () {
    document.addEventListener('visibilitychange', this.onVisibilityChanged.bind(this), false)
    this.startSliderInterval()
  }

  render() {

    const { sliderIndex } = this.state
    const {children, data, stepWidth=1200, scrollWidth=1200, boxWidth=1200, boxHeight=170} = this.props
    const sliderData = children || data || []
    const itemNum = sliderData.length
    const ChevronRight  = (props) => (
        <SvgIcon {...props}>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </SvgIcon>
    )
    const ChevronLeft  = (props) => (
        <SvgIcon {...props}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </SvgIcon>
    )
    return (
      <div className={s.uxSlider} style={{width: `${boxWidth}px`}}>
        {sliderIndex > 0 ?  <div className={s.navIcon + ' ' + s.left} onClick={() => { this.navHandle('left') }} ><ChevronLeft /></div> : ''}
          <div className={s.ulContainer} style={{width:`${boxWidth}px`}}>
            <ul className={s.ul} ref={(sliderList) => (this.sliderList = sliderList)}
                style={{left: `${-sliderIndex * stepWidth}px`, width: `${scrollWidth}px`,height:`{boxHeight}px`}}>
              {
                children ? children : sliderData.map((item, index) => {
                  return (
                    <li className={s.li} key={`slider-${index}`} style={{width: `393px`,height:`110px`, marginRight: `12px`,marginBottom: `20px`}}>
                      <a href={item.link} target='_blank'>
                        <img src={item.picUrl} alt={item.name} />
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {sliderIndex * stepWidth < scrollWidth - boxWidth - 20 ? 
            <div className={s.navIcon + ' ' + s.right} onClick={() => { this.navHandle('right') }} >
              <ChevronRight />
            </div> : ''}
          
      </div>
    )
    }
}

Slider.propTypes = {
  boxWidth: PropTypes.number.isRequired, // 组件可视宽度
  scrollWidth: PropTypes.number.isRequired, //元素实际宽度
  stepWidth: PropTypes.number.isRequired, //默认每次切换宽度
  boxHeight: PropTypes.number, //高度
  data: PropTypes.array,
};

Slider.defaultProps = {
  boxWidth: 1200,
  scrollWidth: 1200,
  stepWidth: 1200,
  boxHeight: 170,
  data: []
};

export default Slider;
