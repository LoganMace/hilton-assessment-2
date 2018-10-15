import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Summary = (props) => {

  const rooms = props.rooms.map(room => {
    return (
      <div>
        {room.checked && 
        <RoomReport>
          <p>{room.name}: {room.adults} adults, {room.children} children.</p>
        </RoomReport>
        }
      </div>
    )
  })
  
  return (
    <SummaryFrame>
      Rooms booked: {rooms}
    </SummaryFrame>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Summary);

const SummaryFrame = styled.div`
  margin: 25px;
  padding: 25px;
  border: solid 2px #E7E7E7;
  font-weight: bold;
`;

const RoomReport = styled.div`
  margin-top: 10px;
  font-weight: normal;
`;