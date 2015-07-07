React.initializeTouchEvents(true);

var Header = React.createClass({displayName: "Header",
  render: function() {
    return (
      React.createElement("div", {className: "bar bar-header bar-light"}, 
        this.props.leftButtonClick ? (React.createElement("button", {className: "button button-icon icon ion-home", onClick: this.props.leftButtonClick})):(''), 
        React.createElement("h1", {className: "title header-item title-center"}, this.props.title)
      )
    )
  }
})

var Footer = React.createClass({displayName: "Footer",
  render: function() {
    return (
      React.createElement("div", {style: {paddingTop: 20}}
      )
    )
  }
})

var List = React.createClass({displayName: "List",
  getInitialState: function() {
    return {content: []}
  },
  componentDidMount: function() {
    $.getJSON('data/news.json', function(data){this.setState({content: data.content})}.bind(this));
  },
  render: function() {
    var items = this.state.content.map(function(row){
      return (
        React.createElement(Item, {data: row, onClick: this.props.onClick})
      )
    }.bind(this))
    return (
      React.createElement("div", {className: "ion-content scroll-content has-header"}, 
        items
      )
    )
  }
})

var Item = React.createClass({displayName: "Item",
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
      React.createElement("div", {className: "list card", onTouchEnd: this.end.bind(this, data), onTouchStart: this.start, onTouchMove: this.move}, 

        React.createElement("a", {className: "item"}, 
          React.createElement("h2", null, data.title), 
          React.createElement("p", null, data.date)
        ), 

        React.createElement("div", {className: "item item-body"}, 
          React.createElement("p", null, 
            data.desc
          )
        )

      )
    )
  }
})

var Page = React.createClass({displayName: "Page",
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
      React.createElement("div", null, 
        React.createElement(Header, {title: "React native 教程"}), 
        React.createElement(List, {onClick: this.loadDetail}), 
        React.createElement(Footer, null)
      )
    )
  },
  renderDetail: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Header, {title: this.state.data.title, leftButtonClick: this.loadList}), 
        React.createElement(Detail, {url: this.state.data.url}), 
        React.createElement(Footer, null)
      )
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

var Detail = React.createClass({displayName: "Detail",
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
      React.createElement("div", {className: "ion-content scroll-content has-header detail", dangerouslySetInnerHTML: {__html: this.getHtml()}})
    )
  }
})

React.render(React.createElement(Page, null), document.body);
