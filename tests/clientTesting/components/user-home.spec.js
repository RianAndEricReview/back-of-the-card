import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {UserHome} from '../../../client/components/user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome
  beforeEach(() => {
    userHome = shallow(<UserHome email={'bob@bob.bob'} />)
  })
  it('renders the email in an <h3>', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, bob@bob.bob')
  })
})
