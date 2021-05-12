// 只处理后代选择符和子选择符
const operators = [' ', '>'];
function match(selector, element) {
  // 结尾加上子选择符作为哨兵，方便后续代码处理
  let _selector = selector + ' ';
  let selectorParts = _selector.match(/[a-z\.#=\[\]\:]+[\s\>\+\~]/g);
  // 存储从右至左的每个复合选择器和选择符的数据
  let rules = [];
  console.log(selectorParts);
  for (let i = selectorParts.length-1; i >= 0; i--) {
    let selectorPart = selectorParts[i];
    let length = selectorPart.length;
    let operator = selectorPart.charAt(length-1);
    let compoundSelectors = selectorPart.slice(0,length-1);
    let simpleSelectors = compoundSelectors.match(/[a-z]+|\.[a-z]+|\[[a-z]+=[a-z]+\]|\:{1,2}[a-z]+/g);
    // 忽略刚才设置的哨兵
    if (i === selectorParts.length-1) {
      operator = null;
    }
    rules.push({
      operator: operator,
      compoundSelectors: compoundSelectors,
      simpleSelectors: simpleSelectors
    })
  }
  console.log(rules);
  // 设置两个指针分别指向当前的元素和选择器
  let curElement = element;
  let curSelector = rules[0].simpleSelectors;
  return true;
}

 
match("div #id.class", document.getElementById("id"));