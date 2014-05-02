/**
 * Module dependencies
 */

var api = require('./routes/api'),
    fs = require('fs'),
    prompt = require('prompt'),
    credentials = {},
    path = require('path'),
    credentials = require('./config'),
    marked = require('./marked');


api.setDb("mongodb://" + credentials.user + ":" + credentials.password + "@troup.mongohq.com:10017/jojidb");

var check_file = function(file) {
  return fs.existsSync(path.join(__dirname, file));
};

var posts_drafts_path = path.join('posts','drafts')

var check_url = function(file_name) {
  return check_file(path.join(posts_drafts_path, file_name + ".md"));
};

var check_image = function(img_name) {
  return check_file(path.join('public', 'img', img_name)) || img_name.match(/^(https?:\/\/)+i\.imgur\.com.*$/);
};

prompt.start();

var today_date = new Date(),
    today = today_date.getDate() + '/' + (today_date.getMonth() + 1) + '/' + today_date.getFullYear();

var title_req = {
      name: 'title',
      description: 'title',
      type: 'string',
    },
    url_req = {
      name: 'url',
      description: 'url',
      pattern: /^[a-zA-Z\s\-]+$/i,
      conform: check_url,
      required: true
    },
    date_req = {
      name: 'date',
      description: 'date shown: DD/MM/YYYY',
      pattern: /^\d\d?\/\d\d?\/\d{4}$/,
      'default': today
    },
    image_req = {
      name: 'image',
      description: 'image',
      pattern: /[^\s]+(\.(jpg|png|gif|svg))$/i,
      conform: check_image
    };


var send_post_to_db = function(file_path, post) {
  console.log(post);
  var fd = fs.openSync(file_path, 'w');
  fs.writeSync(fd, JSON.stringify(post, null, 4));
  api.addPost(post);
};


prompt.get([ title_req, url_req, date_req, image_req], function(err, result) {
  if(!err) {

    var date_arr = result.date.split('/'),
        date_json = new Date();

        date_json.setDate(parseInt(date_arr[0]));
        date_json.setMonth(parseInt(date_arr[1]) - 1);
        date_json.setYear(parseInt(date_arr[2]));
        date_json = date_json.toJSON();

    var file_content = fs.readFileSync(path.join(__dirname, posts_drafts_path, result.url + ".md"), {encoding:'utf8'}),
        post_content = marked(file_content),
        file_path = path.join(__dirname, 'posts', 'json', result.url + '.json'),
        post_json = {
          url: result.url,
          title: result.title,
          shown_date: date_json,
          last_modified: new Date().toJSON(),
          image: result.image,
          content: post_content
        };

    console.log(post_content);
    // console.log(path.join(posts_final_path, result.url + ".html"));

    fs.writeFileSync(path.join(__dirname, 'posts', 'drafts', result.url + ".html"), post_content, {encoding:'utf8'});

    if(fs.existsSync(file_path)) {
     var old_json_string = fs.readFileSync(file_path, {encoding:'utf8'});
     var old_json = JSON.parse(old_json_string);
     post_json.id = old_json.id;
     post_json.date_created = old_json.date_created;
     send_post_to_db(file_path, post_json);
    }
    else {
      api.getId(function(id) {
        post_json.id = id + 1;
        post_json.date_created = new Date().toJSON();
        send_post_to_db(file_path, post_json);
      });
    }
  }
});

