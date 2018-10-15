import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { saveRooms } from '../ducks/reducer';
import Summary from './Summary';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSummary: false,
      rooms: []
    }
  }

  // Brings initial state down to the component level from redux.

  componentDidMount() {
    this.setState({
      rooms: this.props.rooms
    })
  };

  // Changes local state to reflect the user inputs.

  countHandler = (e, i) => {
    let name = e.target.name;
    let newRooms = this.state.rooms.slice();
    newRooms[i][name] = +e.target.value;
    this.setState({
      rooms: newRooms
    });
  };

  checkHandler = (i, e) => {
    let newRooms = this.state.rooms.slice();
    newRooms[i].checked = e.target.checked;
    this.setState({
      rooms: newRooms
    }, () => {
      for(let j = 0; j < this.state.rooms.length; j++){
            let newRooms = this.state.rooms.slice();
            if(j > i && j !== 0){
              newRooms[j].checked = false;
              this.setState({
                rooms: newRooms
              }, () => {
                this.resetCount(j, i);
              })
            }else if(j < i){
            newRooms[j].checked = true;
            this.setState({
              rooms: newRooms
            }, () => {
              this.resetCount(j, i);
            })
          }
        }
      }
    );
  };

  // Sets inputs to defaults if boxes are unchecked.

  resetCount(j, i){
    let newRooms = this.state.rooms.slice();
    if(!this.state.rooms[j].checked){
      newRooms[j].adults = 1;
      newRooms[j].children = 0;
      this.setState({
        rooms: newRooms
      })
    }else if(!this.state.rooms[i].checked){
      newRooms[i].adults = 1;
      newRooms[i].children = 0;
      this.setState({
        rooms: newRooms
      })
    }
  }

  // Saves all user inputs to redux state, toggles summary component, and alerts the user that rooms have been booked.

  submitHandler = () => {
    this.props.saveRooms(this.state.rooms);
    this.setState({
      showSummary: true
    });
    alert("Rooms successfully booked!");
  };

  render() {

    // Maps over the rooms off of state to render the template for every room.

    const rooms = this.state.rooms.map((room, i) => {
      return (
        <Room key={i} active={room.checked}>
          <Header active={room.checked}>
            { i > 0 && <input type="checkbox" checked={room.checked} onChange={(e) => this.checkHandler(i, e)}/> }
            <h3>{room.name}</h3>
          </Header>
          <ContentWrap>
            <Content>
              <p>Adults<br/>(18+)</p>
              <Count name="adults" value={room.adults} disabled={!room.checked} onChange={(e) => this.countHandler(e, i)}>
                <option value="1">1</option>
                <option value="2">2</option>
              </Count>
            </Content>
            <Content>
              <p>Children<br/>(0-17)</p>
              <Count name="children" value={room.children} disabled={!room.checked} onChange={(e) => this.countHandler(e, i)}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Count>
            </Content>
          </ContentWrap>
        </Room>
      )
    })

    return (
      <Fragment>
        <Wrapper>
          {rooms}
        </Wrapper>
        <Submit onClick={this.submitHandler}>Submit</Submit>
        {this.state.showSummary && <Summary />}
      </Fragment>
    );
  }
}

// Brings in our redux state and puts it on local props.

const mapStateToProps = state => state;
export default connect(mapStateToProps, { saveRooms })(Form);

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 25px;
`;

const Submit = styled.button`
  margin-left: 25px;
`;

const Room = styled.div`
  border-radius: 6px;
  border: solid 3px;
  margin-right: 10px;
  overflow: hidden;
  border-color: ${props => props.active ? "#E7E7E7" : "#CCD0DC"};
  background-color: ${props => props.active ? "white" : "#DBDBE3"};
`;

const Header = styled.div`
  display: flex;
  padding-left: 10px;
  line-height: 20px;
  background-color: ${props => props.active ? "#E7E7E7" : "#DBDBE3"};
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
`;

const Content = styled.div`
  margin: 0 10px;
`;

const Count = styled.select`
  width: 30px;
`;