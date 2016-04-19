var birthDay = new Date(2016, 5, 7);

var ProgressBar = React.createClass({
  render: function() {
    var className = 'c100 p' + this.props.percentage + ' big';
    return (
      <div className={className}>
        <span>{this.props.percentage}%</span>
        <div className="slice">
          <div className="bar"></div>
          <div className="fill"></div>
        </div>
      </div>
    );
  }
});

var ExampleApplication = React.createClass({
  pad: function(value) {
    return value < 10 ? '0' + value : '' + value;
  },

  formatTime: function() {
    var seconds = Math.round(this.props.remaining  / 1000);
    var days = Math.floor(seconds / (60*60*24));
    seconds -= (days*60*60*24);
    var hours = Math.floor(seconds / (60*60));
    seconds -= hours*60*60;
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes*60;
    seconds = Math.floor(seconds);

    return this.pad(days) + ' dias ' + this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(seconds);
  },

  render: function() {
    var message = 'Felipe vai nascer daqui a ' + this.formatTime();
    var percentage = Math.round(100 * (1 - (this.props.remaining / (40 * 7 * 24 * 60 * 60 * 1000))));

    return (
      <div>
        <p>{message}</p>
        <ProgressBar percentage={percentage} />
      </div>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <ExampleApplication remaining={birthDay.getTime() - new Date().getTime()} />,
    document.getElementById('container')
  );
}, 1000);
