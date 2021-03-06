import React, { Fragment, Component } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography,
  TableContainer, Dialog, DialogTitle, DialogContent,
  FormControlLabel, Radio, RadioGroup, Switch, InputLabel,
  Select, Input, Chip, MenuItem, FormLabel, FormControl, 
  TextField, Fab, Checkbox, ListItemText } from '@material-ui/core';
// import PendingTasks from './PendingTasks';
import { Card, CardImg, CardImgOverlay, CardText, 
  CardBody, CardTitle, CardFooter, CardLink, Button, Popover,
  PopoverHeader, PopoverBody, ListGroup, ListGroupItem,
  Row, Col, CardHeader, CardSubtitle, Label,
  TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import classnames from 'classnames';
import { LocalForm, Control, Errors } from 'react-redux-form';
import EditEventForm from './EditEventForm';
import EditProjectForm from './EditProjectForm';
import EditResourceForm from './EditResourceForm';
// import {dumTasks} from './dumTasks';
import dumUsers from './dumUser';
import dumProjects from './dumProjects';
import dumEvents from './dumEvents';
import dumResources from './dumResources';
// import { classNames } from 'react-select/src/utils';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    overflowX: 'auto',
  },
  table: {
    // minWidth: 250,
    maxHeight: 250,
    width: '100%',
  },
  gridL: {
    border: '3px solid',
    marginTop: '2em',
    marginBottom: '2em',
  },
  gridR: {
    border: '3px solid',
    marginTop: '2em',
    marginBottom: '2em',
    // maxHeight: 330,
    // scrollBehavior: 'smooth',
  },
  textPadding: {
    paddingTop: '1em',
    paddingBottom: '0.5em',
  },
  borderJ: {
    border: '3px solid',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  // tableContainer: {
  //   maxHeight: 
  // }
  cardBorderL: {
    // border: '3px solid',
    // height: 450,
    // overflowY: 'scroll',
  },
  cardBorderR: {
    // border: '3px solid',
    height: 450,
    overflowY: 'scroll',
  },
  popBody: {
    height: 300,
    // minwidth: '80%',
    // width: 500,
    padding: 0,
    overflowY: 'scroll',
  },
  popHeader: {
    // width: 500,
  },
  popCardBody: {
    fontSize: '0.75rem',
  },
  popCardFooter: {
    fontSize: '0.5rem'
  },
  dialog: {
    maxWidth: '60%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

function TaskData() {
  const classes = useStyles();

  return (
    // <Paper className={classes.root}>
    // <h1>Pending Tasks</h1>
    null
  );
}

const required = val => val && val.length;
const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => (val) && (val.length >= len);

class EditOtherUserForm extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: this.props.dumUsers[this.props.index],
      isDailogOpen: false,
      isDeleteDailogOpen: false,
      // privelege_level: this.state.dumUsers[this.props.index].privelege_level,
      // display_on_website: this.state.dumUsers[this.props.index].display_on_website,
    };

    this.changeDisplayState = this.changeDisplayState.bind(this);
    this.changePrivLevel = this.changePrivLevel.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.cancelUserEdit = this.cancelUserEdit.bind(this);
    this.confirmDeleteClose = this.confirmDeleteClose.bind(this);
    this.confirmDeleteOpen = this.confirmDeleteOpen.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  changeDisplayState = (event) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        display_on_website: event.target.value,
      },
    });
  };

  changePrivLevel = (event) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        privelege_level: event.target.value,
      },
    });
  };

  handleFormOpen = () => {
    this.setState({
      ...this.state,
      isDailogOpen: true,
    });
  };

  handleFormClose = () => {
    this.setState({
      ...this.state,
      isDailogOpen: false,
    });
  };

  cancelUserEdit = () => {
    this.handleFormClose();
  };

  confirmDeleteOpen = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: true,
    });
  };

  confirmDeleteClose = () => {
    this.setState({
      ...this.state,
      isDeleteDailogOpen: false,
    });
  };

  handleDelete = () => {
    // Call delete thunk here,
    console.log('Deleting: ', this.state.user.name);
    this.confirmDeleteClose();
  }

  handleSubmit = () => {

  }

  render() {
    return(
      <div>
        <Button onClick={() => { 
          this.handleFormOpen(); 
        }} 
          color="primary"
        >
          Edit User
        </Button>
          <Dialog open={this.state.isDailogOpen} maxWidth="sm" fullWidth onClose={this.handleFormClose} scroll="paper">
            <DialogTitle>
              <Typography variant="h4">
                Manage User
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Card>
                <CardHeader>
                  <Typography variant='h2'>{this.state.user.name}</Typography>
                </CardHeader>
                <CardBody>
                  <CardTitle>
                    <Typography variant='h5'>{this.state.user.entry_no}</Typography>
                  </CardTitle>
                  <CardSubtitle>
                    <Typography variant='h6'>{this.state.user.category}</Typography>
                  </CardSubtitle>
                  <CardText>
                    <Typography variant='body1'>{this.state.user.intro}</Typography>
                    <Typography variant='body1'>{`Interests: ${this.state.user.interests}`}</Typography>
                    <Typography variant='body1'>{`Specializations: ${this.state.user.specializations}`}</Typography>
                    <Typography variant='body1'>{`Hostel: ${this.state.user.hostel}`}</Typography>
                    <Typography variant='caption'>{`Email: ${this.state.user.email}`}</Typography>
                    <Typography variant='body1'>{`Mobile: ${this.state.user.mobile_number}`}</Typography>
                    {
                      Array.from(this.state.user.url).map(([key, value]) => {
                        return(
                          <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                        );
                      })
                    }
                  </CardText>
                </CardBody>
                <CardFooter>
                  <LocalForm>
                    <Row className="form-group">
                      <Label htmlFor="privelege_level" md={12}><h6>Set privelege level:</h6></Label>
                      <Col sm={12}>
                        <RadioGroup row aria-label="privelege_level" name="privelege_level" defaultValue={this.state.user.privelege_level} onChange={this.handlePrivChange}>
                          <FormControlLabel
                            value="Unapproved_User"
                            control={<Radio color="primary" />}
                            label="Unapprove User"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="Approved_User"
                            control={<Radio color="primary" />}
                            label="A[pprove User"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="Admin"
                            control={<Radio color="secondary" />}
                            label="Make Admin"
                            labelPlacement="start"
                          />
                          {/* <FormControlLabel value="end" control={<Radio color="primary" />} label="End" /> */}
                        </RadioGroup>
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col>
                        <Label htmlFor="display_on_website" sm={5}><h6>Display on website:  </h6></Label>
                        <FormControlLabel
                          sm={2}
                          // label="Display on Website"
                          control={<Switch checked={this.state.user.display_on_website} onChange={this.changeDisplayState} />}
                        />
                      </Col>
                    </Row>
                  </LocalForm>
                </CardFooter>
              </Card>
              <Row className="form-group">
                {/* md={{ size: 2 }} */}
                <Col sm={{ size: 5, offset: 4 }}>
                  <Button color="primary" onClick={this.confirmDeleteOpen}>
                    Remove User
                  </Button>
                </Col>
                <Dialog open={this.state.isDeleteDailogOpen} onClose={this.confirmDeleteClose}>
                  <DialogContent>
                    <Typography variant='h5'>
                      Are you sure you want to remove the user {this.state.user.name}
                    </Typography>
                    <Row className="form-group">
                      <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                        <Button onClick={this.handleDelete} color="primary">
                          Confirm Delete
                        </Button>
                      </Col>
                      <Col xs={3} md={{ size: 2 }}>
                        <Button color="primary" onClick={this.confirmDeleteClose}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </DialogContent>
                </Dialog>
              </Row> 
              <Row className="form-group">
                <Col sm={{ size: 4, offset: 3 }}>
                  <Button color="primary" onClick={this.handleSubmit}>
                    Save Changes
                  </Button>
                </Col>
                <Col sm={{ size: 2 }}>
                  <Button color="primary" onClick={this.cancelUserEdit}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </DialogContent>
            {/* </ModalBody> */}
          </Dialog>
      </div>
    );
  }
};

export default function Home(props) {
  const classes = useStyles();
  // const curUser = dumUsers[0];
  const curUser = props.user;
  const dumUsers = props.users.allUsers;
  const dumEvents = props.events.allEvents;
  const dumProjects = props.projects.allProjects;
  const dumResources = props.resources.allResources;

  const [eventPopOpen, setEventPopOpen] = React.useState(false);
  const toggleEventPop = () => setEventPopOpen(!eventPopOpen);

  const [projectPopOpen, setProjectPopOpen] = React.useState(false);
  const toggleProjectPop = () => setProjectPopOpen(!projectPopOpen);

  const [resourcePopOpen, setResourcePopOpen] = React.useState(false);
  const toggleResourcePop = () => setResourcePopOpen(!resourcePopOpen);

  const [memPopOpen, setMemPopOpen] = React.useState(false);
  const toggleMemPop = () => {
    setMemPopOpen(!memPopOpen);
  };

  const [eventDailogOpen, setEventDailogOpen] =  React.useState(false);
  const [projectDailogOpen, setProjectDailogOpen] =  React.useState(false);
  const [resourceDailogOpen, setResourceDailogOpen] =  React.useState(false);
  const [userDailogOpen, setUserDailogOpen] =  React.useState(false);

  const handleEventCardOpen = () => {
    console.log('Event card clicked');
    setEventDailogOpen(true);
  }
  const handleEventCardClose = () => {
    console.log('Event card clicked');
    setEventDailogOpen(false);
  }

  const [activeTab, setActiveTab] = React.useState('Ongoing');
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const [activeTaskTab, setActiveTaskTab] = React.useState('Events');
  const toggleTask = tab => {
    if (activeTaskTab !== tab) {
      setActiveTaskTab(tab);
    }
  };

  const handleProjectCardOpen = () => {
    console.log('Project card clicked');
    setProjectDailogOpen(true);
  }
  const handleProjectCardClose = () => {
    console.log('Project card clicked');
    setProjectDailogOpen(false);
  }

  const handleResourceCardOpen = () => {
    console.log('card clicked');
    setResourceDailogOpen(true);
  }
  const handleResourceCardClose = () => {
    console.log('card clicked');
    setResourceDailogOpen(false);
  }

  const handleUserCardOpen = () => {
    console.log('card clicked');
    setUserDailogOpen(true);
  }
  const handleUserCardClose = () => {
    console.log('card clicked');
    setUserDailogOpen(false);
  }

  function isOngoing (startDate: Date, endDate: Date) {
    let today = new Date();
    if(today > startDate && today < endDate) {
      return true;
    }
    else {
      return false;
    }
  }

  function isCompleted (endDate: Date) {
    let today = new Date();
    if(today > endDate) {
      return true;
    }
    else {
      return false;
    }
  }

  function isUpcoming (startDate: Date) {
    let today = new Date();
    if(today < startDate) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <div>
      <Grid id="pageContainer" container spacing={3} justify="space-evenly">
        {/* <Grid item xs={12} md={8} lg={9}>
          <Paper className="">
            <TaskData />
            
          </Paper>
        </Grid> */}
        <Grid item id="popContainer" spacing={3} container xs={12} md={5} justify="space-evenly" className={classes.cardBorderL}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">Club Activities</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="btn" id="eventCard" onClick={handleEventCardOpen}>
              <CardBody>
                <CardTitle>Events</CardTitle>
                <CardText>{dumEvents.length}</CardText>
              </CardBody>
            </Card>
            <Dialog open={eventDailogOpen} maxWidth="sm" fullWidth onClose={handleEventCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Club Events
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Ongoing
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Upcoming' })}
                      onClick={() => toggle('Upcoming')}
                    >
                      Upcoming
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Completed
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Ongoing'>
                    {
                      props.events.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Events</h4>
                        <h4>{props.events.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumEvents.filter((event) => isOngoing(event.start_date, event.end_date)).map((event, index) => {
                            return(
                              <Fragment key={`${event}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{event.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{event.description}</Typography>
                                        {
                                          Array.from(event.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: {event.assignee}
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Upcoming'>
                    {
                      props.events.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Events</h4>
                        <h4>{props.events.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumEvents.filter((event) => isUpcoming(event.start_date)).map((event, index) => {
                            return(
                              <Fragment key={`${event}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{event.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{event.description}</Typography>
                                        {
                                          Array.from(event.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: {event.assignee !== '' ? event.assignee: 'None'}
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Completed'>
                    {
                      props.events.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Events</h4>
                        <h4>{props.events.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumEvents.filter((event) => isCompleted(event.end_date)).map((event, index) => {
                            return(
                              <Fragment key={`${event}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{event.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{event.description}</Typography>
                                        {
                                          Array.from(event.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: {event.assignee}
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                </TabContent>
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={eventPopOpen}
              target="eventCard"
              // container="pageContainer"
              // className={classes.pops}
              // boundariesElement='popContainer'
              toggle={toggleEventPop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}><Typography>Club Events</Typography></PopoverHeader>
              <PopoverBody
                className={classes.popBody}
              >
                <ListGroup>
                  {
                    dumEvents.map((event, index) => {
                      return(
                        <Fragment key={`${event}~${index}`}>
                          <ListGroupItem>
                            <Card>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="primary">{event.name}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{event.description}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                <Typography className={classes.popCardFooter} color="textSecondary">{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                Assigned to: {event.assignee !== '' ? event.assignee: 'None'}
                                {/* <CardLink onClick={null}>Manage User</CardLink> */}
                                {
                                  curUser.privelege_level === 'Admin'
                                    ?
                                    <EditEventForm dumEvents={dumEvents} dumUsers={dumUsers} editEvent={props.editEvent} index={index} />
                                    : null
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="btn" id="projectCard" onClick={handleProjectCardOpen}>
              <CardBody>
                <CardTitle>Projects</CardTitle>
                <CardText>{dumProjects.length}</CardText>
              </CardBody>
            </Card>
            <Dialog open={projectDailogOpen} maxWidth="sm" fullWidth onClose={handleProjectCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Club Projects
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Ongoing
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Upcoming' })}
                      onClick={() => toggle('Upcoming')}
                    >
                      Upcoming
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Completed
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Ongoing'>
                    {
                      props.projects.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Projects</h4>
                        <h4>{props.projects.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumProjects.filter((project) => project.status === 'ONGOING').map((project, index) => {
                            return(
                              <Fragment key={`${project}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{project.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{project.description}</Typography>
                                        {
                                          Array.from(project.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: 
                                      {
                                        project.members.map((mem) => ' ' +  mem.name + ',')
                                      }
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Upcoming'>
                    {
                      props.projects.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Projects</h4>
                        <h4>{props.projects.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumProjects.filter((project) => project.status === 'IDEA').map((project, index) => {
                            return(
                              <Fragment key={`${project}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{project.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{project.description}</Typography>
                                        {
                                          Array.from(project.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: 
                                      {
                                        project.members.map((mem) => ' ' +  mem.name + ',')
                                      }
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Completed'>
                    {
                      props.projects.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Projects</h4>
                        <h4>{props.projects.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumProjects.filter((project) => project.status === 'COMPLETED').map((project, index) => {
                            return(
                              <Fragment key={`${project}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{project.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{project.description}</Typography>
                                        {
                                          Array.from(project.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      Assigned to: 
                                      {
                                        project.members.map((mem) => ' ' +  mem.name + ',')
                                      }
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                </TabContent>
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={projectPopOpen}
              target="projectCard"
              toggle={toggleProjectPop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}>
                <Typography>Club Projects</Typography>
              </PopoverHeader>
              <PopoverBody className={classes.popBody}>
                <ListGroup>
                  {
                    dumProjects.map((project, index) => {
                      return(
                        <Fragment key={`${project}~${index}`}>
                          <ListGroupItem>
                            <Card>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="primary">{project.name}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{project.description}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                <Typography className={classes.popCardFooter} color="textSecondary">{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}\n${project.members[0] !== undefined ? project.members[0].name : null}...`}</Typography>
                                {
                                  curUser.privelege_level === 'Admin'
                                  ?
                                  <EditProjectForm dumProjects={dumProjects} dumUsers={dumUsers} editProject={props.editProject} index={index} />
                                  : null
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card id="resourceCard" className="btn" onClick={handleResourceCardOpen}>
              <CardBody>
                <CardTitle>Resources</CardTitle>
                <CardText>{dumResources.length}</CardText>
              </CardBody>
            </Card>
            <Dialog open={resourceDailogOpen} maxWidth="sm" fullWidth onClose={handleResourceCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Club Resources
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Archived
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Current
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Completed'>
                    {
                      props.resources.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.resources.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumResources.filter((res) => res.archive).map((res, index) => {
                            return(
                              <Fragment key={`${res}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{res.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{res.directory_year}</Typography>
                                        {
                                          curUser.privelege_level !== 'Unapproved_User'
                                          ?
                                          <Typography variant='body1'>({res.internal_name})</Typography>
                                          : null
                                        }
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{res.description}</Typography>
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      <CardLink href={res.url}>Access resource</CardLink>
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Ongoing'>
                    {
                      props.resources.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.resources.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumResources.filter((res) => !(res.archive)).map((res, index) => {
                            return(
                              <Fragment key={`${res}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h4'>{res.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h6'>{res.directory_year}</Typography>
                                        {
                                          curUser.privelege_level !== 'Unapproved_User'
                                          ?
                                          <Typography variant='body1'>({res.internal_name})</Typography>
                                          : null
                                        }
                                      </CardTitle>
                                      <CardText>
                                        <Typography variant='body1' >{res.description}</Typography>
                                      </CardText>
                                    </CardBody>
                                    <CardFooter>
                                      <CardLink href={res.url}>Access resource</CardLink>
                                    </CardFooter>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                </TabContent>
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={resourcePopOpen}
              target="resourceCard"
              toggle={toggleResourcePop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}><Typography>Club Resources</Typography></PopoverHeader>
              <PopoverBody
                className={classes.popBody}
              >
                <ListGroup>
                  {
                    dumResources.map((res, index) => {
                      return(
                        <Fragment key={`${res}~${index}`}>
                          <ListGroupItem>
                            <Card>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="primary">{res.name}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{`${res.description.substr(0, 30)}...`}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                {/* <Typography className={classes.popCardFooter} color="textSecondary">{res.url}</Typography> */}
                                <CardLink href={res.url}>Access resource</CardLink>
                                {
                                  curUser.privelege_level === 'Admin'
                                  ?
                                  <EditResourceForm dumResources={dumResources} dumUsers={dumUsers} editResource={props.editResource} index={index} />
                                  : null
                                }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card id="memCard" className="btn" onClick={handleUserCardOpen}>
              <CardBody>
                <CardTitle>Members</CardTitle>
                <CardText>{dumUsers.length}</CardText>
              </CardBody>
            </Card>
            <Dialog open={userDailogOpen} maxWidth="sm" fullWidth onClose={handleUserCardClose} scroll="paper">
              <DialogTitle>
                <Typography variant="h4">
                  View Members
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Nav tabs>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Ongoing' })}
                      onClick={() => toggle('Ongoing')}
                    >
                      Admin
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Upcoming' })}
                      onClick={() => toggle('Upcoming')}
                    >
                      Approved
                    </NavLink>
                  </NavItem>
                  <NavItem className="btn">
                    <NavLink
                      className={classnames({ active: activeTab === 'Completed' })}
                      onClick={() => toggle('Completed')}
                    >
                      Unapproved
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId='Ongoing'>
                    {
                      props.users.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.users.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumUsers.filter((user) => user.privelege_level === 'Admin').map((user, index) => {
                            return(
                              <Fragment key={`${user}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h2'>{user.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h5'>{user.entry_no}</Typography>
                                      </CardTitle>
                                      <CardSubtitle>
                                        <Typography variant='h6'>{user.category}</Typography>
                                      </CardSubtitle>
                                      <CardText>
                                        <Typography variant='body1'>{user.intro}</Typography>
                                        <Typography variant='body1'>{`Interests: ${user.interests}`}</Typography>
                                        <Typography variant='body1'>{`Specializations: ${user.specializations}`}</Typography>
                                        <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                                        <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                                        <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                                        {
                                          Array.from(user.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Upcoming'>
                    {
                      props.users.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.users.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumUsers.filter((user) => user.privelege_level === 'Approved_User').map((user, index) => {
                            return(
                              <Fragment key={`${user}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h2'>{user.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h5'>{user.entry_no}</Typography>
                                      </CardTitle>
                                      <CardSubtitle>
                                        <Typography variant='h6'>{user.category}</Typography>
                                      </CardSubtitle>
                                      <CardText>
                                        <Typography variant='body1'>{user.intro}</Typography>
                                        <Typography variant='body1'>{`Interests: ${user.interests}`}</Typography>
                                        <Typography variant='body1'>{`Specializations: ${user.specializations}`}</Typography>
                                        <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                                        <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                                        <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                                        {
                                          Array.from(user.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                  <TabPane tabId='Completed'>
                    {
                      props.users.errMess !== null
                      ?
                      <div>
                        <h4>Failed to fetch Resources</h4>
                        <h4>{props.users.errMess}</h4>
                      </div>
                      : null
                    }
                    {
                      <ListGroup>
                        {
                          dumUsers.filter((user) => user.privelege_level === 'Unapproved_User').map((user, index) => {
                            return(
                              <Fragment key={`${user}~${index}`}>
                                <ListGroupItem>
                                  <Card color="primary" outline>
                                    <CardHeader>
                                      <Typography variant='h2'>{user.name}</Typography>
                                    </CardHeader>
                                    <CardBody>
                                      <CardTitle>
                                        <Typography variant='h5'>{user.entry_no}</Typography>
                                      </CardTitle>
                                      <CardSubtitle>
                                        <Typography variant='h6'>{user.category}</Typography>
                                      </CardSubtitle>
                                      <CardText>
                                        <Typography variant='body1'>{user.intro}</Typography>
                                        <Typography variant='body1'>{`Interests: ${user.interests}`}</Typography>
                                        <Typography variant='body1'>{`Specializations: ${user.specializations}`}</Typography>
                                        <Typography variant='body1'>{`Hostel: ${user.hostel}`}</Typography>
                                        <Typography variant='caption'>{`Email: ${user.email}`}</Typography>
                                        <Typography variant='body1'>{`Mobile: ${user.mobile_number}`}</Typography>
                                        {
                                          Array.from(user.url).map(([key, value]) => {
                                            return(
                                              <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                            );
                                          })
                                        }
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                </ListGroupItem>
                              </Fragment>
                            );
                          })
                        }
                      </ListGroup>
                    }
                  </TabPane>
                </TabContent>
              </DialogContent>
            </Dialog>
            <Popover
              placement="bottom"
              isOpen={memPopOpen}
              target="memCard"
              toggle={toggleMemPop}
              trigger="hover"
            >
              <PopoverHeader className={classes.popHeader}><Typography>All Dashboard Users</Typography></PopoverHeader>
              <PopoverBody
                className={classes.popBody}
              >
                <ListGroup>
                  {
                    dumUsers.map((user, index) => {
                      return(
                        <Fragment key={`${user}~${index}`}>
                          <ListGroupItem>
                            <Card>
                              <CardBody>
                                <CardTitle>
                                  <Typography color="primary">{user.name}</Typography>
                                  <Typography variant="body2">{user.entry_no}</Typography>
                                </CardTitle>
                                <CardText>
                                  <Typography className={classes.popCardBody} >{`${user.intro.substr(0, 30)}...`}</Typography>
                                </CardText>
                              </CardBody>
                              <CardFooter>
                                <Typography className={classes.popCardFooter} color="textSecondary">{`${user.category}\n${(user.privelege_level === 'Unapproved_User' ? 'Unapproved':'')}`}</Typography>
                                {/* <CardLink onClick={null}>Manage User</CardLink> */}
                                  {
                                    curUser.privelege_level === 'Admin'
                                    ?
                                    <EditOtherUserForm dumUsers={dumUsers} editUser={props.editOtherUser} index={index} />
                                    : null
                                  }
                              </CardFooter>
                            </Card>
                          </ListGroupItem>
                        </Fragment>
                      );
                    })
                  }
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Grid>
        </Grid>
        <Grid item id="myTaskContainer" spacing={3} xs={12} md={5} className={classes.cardBorderR}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">My Tasks</Typography>
          </Grid>
          <Grid item xs={12}>
            <Nav tabs>
              <NavItem className="btn">
                <NavLink
                  className={classnames({ active: activeTaskTab === 'Events' })}
                  onClick={() => toggleTask('Events')}
                >
                  Events
                </NavLink>
              </NavItem>
              <NavItem className="btn">
                <NavLink
                  className={classnames({ active: activeTaskTab === 'Upcoming' })}
                  onClick={() => toggleTask('Projects')}
                >
                  Projects
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTaskTab}>
              <TabPane tabId='Events'>
                {
                  <ListGroup>
                    {
                      dumEvents.filter((event) => event.assignee === curUser.name).map((event, index) => {
                        return(
                          <Fragment key={`${event}~${index}`}>
                            <ListGroupItem>
                              <Card color="primary" outline>
                                <CardHeader>
                                  <Typography variant='h4'>{event.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                  <CardTitle>
                                    <Typography variant='h6'>{`${event.start_date.toDateString()} - ${event.end_date.toDateString()}`}</Typography>
                                  </CardTitle>
                                  <CardText>
                                    <Typography variant='body1' >{event.description}</Typography>
                                    {
                                      Array.from(event.url).map(([key, value]) => {
                                        return(
                                          <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                        );
                                      })
                                    }
                                  </CardText>
                                </CardBody>
                                {/* <CardFooter>
                                  Assigned to: {event.assignee}
                                </CardFooter> */}
                              </Card>
                            </ListGroupItem>
                          </Fragment>
                        );
                      })
                    }
                  </ListGroup>
                }
              </TabPane>
              <TabPane tabId='Projects'>
                {
                  <ListGroup>
                    {
                      dumProjects.filter((project) => project.members.map((mem) => mem.name).indexOf(curUser.name) !== -1).map((project, index) => {
                        return(
                          <Fragment key={`${project}~${index}`}>
                            <ListGroupItem>
                              <Card color="primary" outline>
                                <CardHeader>
                                  <Typography variant='h4'>{project.name}</Typography>
                                </CardHeader>
                                <CardBody>
                                  <CardTitle>
                                    <Typography variant='h6'>{project.status}</Typography>
                                    <Typography variant='h6'>{`${project.start_date.toDateString()} - ${project.end_date.toDateString()}`}</Typography>
                                  </CardTitle>
                                  <CardText>
                                    <Typography variant='body1' >{project.description}</Typography>
                                    {
                                      Array.from(project.url).map(([key, value]) => {
                                        return(
                                          <Typography variant='body1'>{`${key}: `}<CardLink href={value}>{value}</CardLink></Typography>
                                        );
                                      })
                                    }
                                  </CardText>
                                </CardBody>
                                <CardFooter>
                                  Assigned to: 
                                  {
                                    project.members.map((mem) => ' ' +  mem.name + ',')
                                  }
                                </CardFooter>
                              </Card>
                            </ListGroupItem>
                          </Fragment>
                        );
                      })
                    }
                  </ListGroup>
                }
              </TabPane>
            </TabContent>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}