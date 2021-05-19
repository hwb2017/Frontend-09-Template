const cheerio = require('cheerio')
const axios = require('axios');
const { Workbook, Topic, Zipper } = require('xmind');
const workbook = new Workbook();
const topic = new Topic({sheet: workbook.createSheet('sheet title', 'CSS属性分类')});
const zipper = new Zipper({path: './', workbook, filename: 'CSS属性分类脑图'});

const getDrafts = async() => {
  const drafts = [];
  await axios.get('https://www.w3.org/TR/?tag=css').then((response) => {
  const $ = cheerio.load(response.data);
  const urlElems = $('#container li[data-tag~=css] h2:not(.Retired):not(.GroupNote)');
  for (let i = 0; i < urlElems.length; i++) {
      let a = $(urlElems[i]).find('a')[0];
      drafts.push({
        "title": $(a).attr('title'),
        "url": $(a).attr('href')
      });
  }})
  return drafts;
}

const getGroupedAttrs = async(drafts) => {
  const groupedAttrs = [];
  for (let draft of drafts) {
    let title = draft['title'].replace('Latest draft of ','').replace(' formally approved by the group','');
    console.log(`Scraping ${title}...`);
    const attrs = [];
    await axios.get(draft['url']).then((response) => {
      const $ = cheerio.load(response.data);
      const urlElems = $('.propdef [data-dfn-type=property]');
      if (urlElems.length > 0) {
        for (let i = 0; i < urlElems.length; i++) {
          attrs.push($(urlElems[i]).text());
        }
        groupedAttrs.push({
          "topic": title,
          "attrs": attrs
        });
        console.log(`Got ${urlElems.length} items.`)
      }
    });
  }
  return groupedAttrs;
}

(async() => {
  const drafts = await getDrafts(); 
  const groupedAttrs = await getGroupedAttrs(drafts);

  for (let item of groupedAttrs) {
    try {
      topic.on(topic.cid('CSS属性分类')).add({title: item['topic']});
      for (let attr of item['attrs']) {
        topic.on(topic.cid(item['topic'])).add({title: attr});
      }
    } catch(error) {
      console.warn(error);
    }
  }  
  zipper.save().then(status => status && console.log('Saved ./CSS属性分类.xmind'));    
})();