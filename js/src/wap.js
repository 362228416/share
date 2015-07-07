React.initializeTouchEvents(true);

var Header = React.createClass({
  render: function() {
    return (
      <div className="bar bar-header bar-light">
        {this.props.leftButtonClick ? (<button className="button button-icon icon ion-home" onClick={this.props.leftButtonClick}></button>):('')}
        <h1 className="title header-item title-center">{this.props.title}</h1>
      </div>
    )
  }
})

var Footer = React.createClass({
  render: function() {
    return (
      <div style={{paddingTop: 20}}>
      </div>
    )
  }
})

var List = React.createClass({
  getInitialState: function() {
    return {content: ["ubuntu", "mysql"]}
  },
  componentDidMount: function() {
    $.getJSON('data/news.json', function(data){this.setState({content: data.content})}.bind(this));
  },
  render: function() {
    var items = this.state.content.map(function(row){
      return (
        <div className="item" data={row} onClick={this.props.onClick}/>
      )
    }.bind(this))
    return (
      <div className="ion-content scroll-content has-header">
        {items}
      </div>
    )
  }
})

var Item = React.createClass({
  move: function() {
    this.click = false;
  },
  start: function() {
    this.click = true;
  },
  end: function(data) {
    if (this.click) {
      this.props.onClick(data);
    }
  },
  render: function() {
    var data = this.props.data;
    return (
      <div className="list card" onTouchEnd={this.end.bind(this, data)} onTouchStart={this.start} onTouchMove={this.move}>

        <a className="item">
          <h2>{data.title}</h2>
          <p>{data.date}</p>
        </a>

        <div className="item item-body">
          <p>
            {data.desc}
          </p>
        </div>

      </div>
    )
  }
})

var Page = React.createClass({
  getInitialState: function() {
    return {showDetail: false}
  },
  loadList: function() {
    this.setState({showDetail: false});
  },
  loadDetail: function(data) {
    this.setState({data: data, showDetail: true});
  },
  renderList: function() {
    return (
      <div>
        <Header title="React native 教程"/>
        <List onClick={this.loadDetail}/>
        <Footer/>
      </div>
    )
  },
  renderDetail: function() {
    return (
      <div>
        <Header title={this.state.data.title} leftButtonClick={this.loadList}/>
        <Detail url={this.state.data.url}/>
        <Footer/>
      </div>
    )
  },
  render: function() {
    if (!this.state.showDetail) {
      return this.renderList();
    } else {
      return this.renderDetail();
    }
  }
})

var Detail = React.createClass({
  getInitialState: function() {
    return {content: ""}
  },
  componentDidMount: function() {
    $.get(this.props.url, function(data){
      this.setState({content: data});
    }.bind(this))
  },
  getHtml: function() {
    var converter = new showdown.Converter();
    var html = converter.makeHtml(this.state.content);
    return html;
  },
  render: function() {
    return (
      <div className="ion-content scroll-content has-header detail" dangerouslySetInnerHTML={{__html: this.getHtml()}}></div>
    )
  }
})

React.render(<Page/>, document.body);
