import React from 'react'
import Popup from 'reactjs-popup'

const Footer = () => {
  return (
      <footer>
        <div className="row">
          <div className="col-4 footer-left">
            <div>Baseball Statistics Provided By:</div>
            <div><a href="http://www.seanlahman.com/baseball-archive/statistics/">Lahman Baseball Database</a></div>
            <div>copyright 1996-2018 by Sean Lahman</div>
            <Popup
              trigger={<div style={{ cursor: 'pointer' }} id="license-link" className="btn btn-info">Click to Display License Information</div>}
              modal
              closeOnDocumentClick
            >
              <p>Limited Use License</p>
              <p>This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.</p>
              <p>For details see: <a href="http://creativecommons.org/licenses/by-sa/3.0/">http://creativecommons.org/licenses/by-sa/3.0/</a></p>
              <p>Thanks to Ted Turocy of the Chadwick Baseball Bureau, who for several years has done the heavy lifting to make the annual updates possible. Ted also hosts a version of the data at github, for folks who are inclined to interface with it that way.</p>
              <p>Thanks also to Mark Keip for producing a SQL version of the latest database.</p>
            </Popup>

          </div>
          <div className="col-4 footer-middle">
            <div><h2>BackOfTheCard</h2></div>
            <div><h4>Rian Halperin & Eric Garnett</h4></div>
            <div><h5><a href="mailto:backofthecard@gmail.com?subject=BackOfTheCard">
            backofthecard@gmail.com</a></h5></div>
          </div>
          <div className="col-4 footer-right">
            <div>Art Assets Provided By:</div>
            <div><a href="http://stickpng.com">StickPNG</a></div>
            <div>Rian Halperin</div>
            <div>Eric Garnett</div>
          </div>

        </div>
      </footer>
  )
}

export default Footer
