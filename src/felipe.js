var birthDay = new Date(2016, 4, 23);

var pad = function(value) {
  return value < 10 ? '0' + value : '' + value;
};

var processTime = function(remainingTime) {
  var seconds = Math.round(remainingTime  / 1000);
  var days = Math.floor(seconds / (60*60*24));
  seconds -= (days*60*60*24);
  var hours = Math.floor(seconds / (60*60));
  seconds -= hours*60*60;
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes*60;
  seconds = Math.floor(seconds);

  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds)
  };
}

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
  formatTime: function() {
    var time = processTime(this.props.remaining);

    return time.days + ' dias ' + time.hours + ':' + time.minutes + ':' + time.seconds;
  },

  render: function() {
    var message = 'Felipe vai nascer daqui a ' + this.formatTime();
    var percentage = Math.round(100 * (1 - (this.props.remaining / (40 * 7 * 24 * 60 * 60 * 1000))));
    var weeks = 40 * percentage / 100;

    return (
      <div>
        <p>{weeks} semanas</p>
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
