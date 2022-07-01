import React from 'react';
import './Header.css';


class Header extends React.Component {

  constructor() {
    super()

    this.setTimeZone = this.setTimeZone.bind(this)
  }

  setTimeZone(e) {
    this.props.setTimeZone(e.target.value)
  }

 
  render() {
    return (

      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 name d-flex align-items-center"><div>Event Manager</div></div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-flex justify-content-end align-items-center globe">
            <div className="d-flex align-items-center">
              <div className="px-2 d-flex justify-content-around align-items-center">
                <div><i className="bi bi-globe mx-2"></i></div>
                <div>Select Timezone</div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 d-flex align-items-center" >
            <select className="form-select" onChange={this.setTimeZone}>
              <option select="true" value="ET">Eastern Time, ET</option>
              <option value="EET">Eastern European Time, EET</option>
              <option value="CET">Central European Time, CET</option>
              <option value="UTC">Coordinated Universal Time, UTC</option>
            </select>
          </div>
        </div>
      </div>

    )
  }

}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
