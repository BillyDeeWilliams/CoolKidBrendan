'use strict';
var articles = [];

function Article (opts) {
  // TODO: DONE Use the object passed in to complete this constructor function:
  // Save ALL the properties of `opts` into `this`.
  this.imageURL = opts.imageURL;
  this.title = opts.title;
  this.keywords = opts.category;
  this.employer = opts.employer;
  this.employerUrl = opts.employerUrl;
  this.liveUrl = opts.liveUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.projectTemplate').clone();

  $newArticle.find('img').attr('src', this.imageURL);
  $newArticle.find('h1').html(this.title);
  $newArticle.find('a.projectSponsor').html(this.employer);
  $newArticle.find('a.projectSponsor').attr('href', this.employerUrl);

  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  $newArticle.find('div.projectBody').html(this.body); //THIS BREAKS THE PAGE!!!!!!!
  /*  This clone article is no longer a template,
  as it now has real data attached to it. must account
  for this before this current article gets rendered to
  DOM. */
  $newArticle.removeAttr('class');

  return $newArticle;
};

ourLocalData.sort(function(curElem, nextElem) {
  return (new Date(nextElem.publishedOn)) - (new Date(curElem.publishedOn));
});

ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
