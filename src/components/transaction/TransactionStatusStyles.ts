import styled from 'styled-components'

export const Fixed = styled.div`
  position: fixed;
  top: 100px;
  width: 400px;
  right: 10px;
  padding: 2px;
  z-index: 100;
  text-align: center;
`

export const FloatingNotification = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 20px;
  border-radius: 2px;
  padding: 10px;
`

export const Status = styled.div`
  height: auto;
  border-radius: 2px;
  margin-right: 2px;
  padding: 2px;
  background-color: #EF8395;
  color: black;
`

export const Pending = styled(Status)`
  background-color: #FFF;
  color: #EF8395;
  font-family: 'Roboto';
`

export const Success = styled(Status)`
  background-color: #EF8395;
  height: 100%;
  color: white;
  font-family: 'Roboto';
`

export const Error = styled(Status)`
  background-color: #FFF;
  color: red;
  font-family: 'Roboto';
`

export const Message = styled.div`
  font-size: 0.9em;
  background-color: #FFF;
  border: 2px solid #EF8395;
  color: white;
`

export const InfoMessage = styled.div`
  font-family: 'Roboto';
  font-size: 0.9em;
  text-align: left;
  color: white;
`

export const CloseModalButton = styled.button`
  background-color: white;
  border: 0px;
  border-radius: 4px;
  height: 30px;
  width: 20px;
  margin-left: 5px;
  padding-left: 5px;
  color: #EF8395;
  font-weight: bold;
  cursor: pointer;
`
