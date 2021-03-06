import React, { Component } from 'react';
import {
  Grid, Dialog, DialogTitle, DialogContent,
  InputLabel, Select, MenuItem, FormControl, Fab, Button, IconButton,
  Tooltip,
} from '@material-ui/core';
// import PendingTasks from './PendingTasks';
import {
  Row, Col, Label,
} from 'reactstrap';
import AddIcon from '@material-ui/icons/Add';
import { LocalForm, Control } from 'react-redux-form';
import MUIDataTable from 'mui-datatables';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import RestoreIcon from '@material-ui/icons/Restore';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

class DeployManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: ['S.No.', 'Repo', 'Build',
        {
          name: 'Uptime',
          options: {
            filter: false,
          },
        },
        'Subdomain',
        'Access',
        {
          name: 'Edit Env',
          options: {
            filter: false,
            sort: false,
            customBodyRender: index => (
              <IconButton variant="outlined" color="primary" component="span">
                <EditIcon fontSize="small" color="primary" />
              </IconButton>
            ),
          },
        },
        {
          name: 'Get Logs',
          options: {
            filter: false,
            sort: false,
            customBodyRender: index => (
              <IconButton variant="outlined" color="primary" component="span">
                <GetAppIcon fontSize="small" color="primary" />
              </IconButton>
            ),
          },
        },
        {
          name: 'Redeploy',
          options: {
            filter: false,
            sort: false,
            customBodyRender: index => (
              <IconButton variant="outlined" color="primary" component="span">
                <RestoreIcon fontSize="small" color="primary" />
              </IconButton>
            ),
          },
        },
        {
          name: 'Stop',
          options: {
            filter: false,
            sort: false,
            customBodyRender: index => (
              <IconButton variant="outlined" color="primary" component="span">
                <PowerSettingsNewIcon fontSize="small" color="primary" />
              </IconButton>
            ),
          },
        }],
      data: [
        [1, 'Yearbook', 'Dev', '25:06:02', 'yearbook', 'External'],
        [2, 'Yearbook', 'prod', '46:34:34', 'yearbook', 'External'],
        [3, 'Main web', 'prod', '25:42:34', 'web', 'External'],
        [4, 'dashboard', 'Dev', '76:34:33', 'dboard', 'External'],
        [5, 'main web', 'Dev', '65:25:13', 'web-dev', 'External'],
      ],
      options: {
        filterType: 'checkbox',
        rowsPerPage: 5,
      },
      access: 'Internal',
      build: 'Development',
      isNewDeploymentOpen: false,
    };

    this.handleNewDeploymentClose = this.handleNewDeploymentClose.bind(this);
    this.handleNewDeploymentOpen = this.handleNewDeploymentOpen.bind(this);
    this.handleNewDeploymentSubmit = this.handleNewDeploymentSubmit.bind(this);
    this.handleAccessChange = this.handleAccessChange.bind(this);
    this.handleBuildChange = this.handleBuildChange.bind(this);
  }

  handleNewDeploymentOpen = () => {
    this.setState({
      ...this.state,
      isNewDeploymentOpen: true,
    });
  };

  handleNewDeploymentClose = () => {
    this.setState({
      ...this.state,
      isNewDeploymentOpen: false,
    });
  };

  handleAccessChange = (event) => {
    this.setState({
      ...this.state,
      access: event.target.value,
    });
  };

  handleBuildChange = (event) => {
    this.setState({
      ...this.state,
      build: event.target.value,
    });
  };

  handleNewDeploymentSubmit = (values) => {
    // const newValues = { ...values };
    const newDeploy = {
      ...values,
      access: this.state.access,
      build: this.state.build,
    };
    console.log('Creating new deployment: ', newDeploy);
    this.handleNewDeploymentClose();
  };

  render() {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Tooltip title="Add deployment" aria-label="add">
              <Fab color="primary" onClick={this.handleNewDeploymentOpen}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <MUIDataTable
              title="Deploy Log"
              data={this.state.data}
              columns={this.state.columns}
              options={this.state.options}
            />
          </Grid>
          {/* <Grid item xs={12}> */}
          <Dialog open={this.state.isNewDeploymentOpen} maxWidth="sm" onClose={this.handleNewDeploymentClose} scroll="paper">
            <DialogTitle>
              {/* <Typography variant="h4" align="center">New Deployment</Typography> */}
              <b>New Deployment</b>
            </DialogTitle>
            <DialogContent>
              <LocalForm onSubmit={values => this.handleNewDeploymentSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="gitRepo" md={4}><h6>GitHub Repository:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".gitRepo"
                      id="gitRepo"
                      name="gitRepo"
                      placeholder="github repository*"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="serverName" md={4}><h6>Server Name:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".serverName"
                      id="serverName"
                      name="serverName"
                      placeholder="server name*"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="subdomain" md={4}><h6>Subdomain:</h6></Label>
                  <Col md={8}>
                    <Control.text
                      model=".subdomain"
                      id="subdomain"
                      name="subdomain"
                      placeholder="subdomain*"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={8}>
                    <FormControl variant="outlined">
                      <InputLabel id="access">
                        Access
                      </InputLabel>
                      <Select
                        labelId="access"
                        id="access"
                        value={this.state.access}
                        onChange={this.handleAccessChange}
                      >
                        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                        <MenuItem value="Internal">Internal</MenuItem>
                        <MenuItem value="External">External</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={8}>
                    <FormControl variant="outlined">
                      <InputLabel id="build">
                        Build
                      </InputLabel>
                      <Select
                        labelId="build"
                        id="build"
                        value={this.state.build}
                        onChange={this.handleBuildChange}
                      >
                        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                        <MenuItem value="Production">Production</MenuItem>
                        <MenuItem value="Development">Development</MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="env" md={12}><h6>Environment Parameters:</h6></Label>
                  <Col md={{ size: 8, offset: 2 }}>
                    <Control.textarea
                      model=".env"
                      id="env"
                      name="env"
                      placeholder="#Specify .env params here"
                      rows="4"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  {/* md={{ size: 4, offset: 3 }} */}
                  <Col xs={{ size: 7, offset: 1 }} md={{ size: 4, offset: 3 }}>
                    <Button type="submit" variant="outlined" color="primary">
                        Deploy
                    </Button>
                  </Col>
                  {/* md={{ size: 2 }} */}
                  <Col xs={3} md={{ size: 2 }}>
                    <Button color="primary" variant="outlined" onClick={this.handleNewDeploymentClose}>
                        Cancel
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </DialogContent>
          </Dialog>
          {/* </Grid> */}
        </Grid>
      </>
    );
  }
}

export default DeployManager;
