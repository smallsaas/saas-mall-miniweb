export default Page({
  data: {
    '__code__': {
      readme: '<h1 class="md-h1">wxc-steps</h1><blockquote>\n<p>MinUI \u5C0F\u7A0B\u5E8F\u7EC4\u4EF6 - \u6B65\u9AA4\u6761</p>\n</blockquote>\n<h2 class="md-h2">Install</h2><code class="lang-bash md-code"><span class="hljs-variable">$ </span>min install <span class="hljs-variable">@minui</span>/wxc-steps</code><h2 class="md-h2">API</h2><h3 class="md-h3">Steps\u3010props\u3011</h3><table class="md-table">\n    <tr class="md-tr">\n<th class="md-th">\u540D\u79F0</th>\n<th class="md-th">\u63CF\u8FF0</th>\n</tr>\n\n    <tr class="md-tr">\n<td class="md-td"><code class="md-code">steps</code></td>\n<td class="md-td">[\u8BF4\u660E]\uFF1A\u6B65\u9AA4\u4FE1\u606F\u6570\u7EC4\u3002\u7EC4\u6210\u5BF9\u8C61\u53C2\u89C1steps\u6570\u7EC4\u9879\u3002<br class="md-br">[\u7C7B\u578B]\uFF1A<code class="md-code">Array</code><br class="md-br">\u9ED8\u8BA4\u503C\uFF1A<code class="md-code">[]</code> <br class="md-br"></td>\n</tr>\n<tr class="md-tr">\n<td class="md-td"><code class="md-code">current</code></td>\n<td class="md-td">[\u8BF4\u660E]\uFF1A\u5F53\u524D\u8FDB\u884C\u7684\u6B65\u9AA4\u4F4D\u7F6E\uFF0C\u4ECE0\u5F00\u59CB\u3002<br class="md-br">[\u7C7B\u578B]\uFF1A<code class="md-code">Number</code><br class="md-br">[\u9ED8\u8BA4\u503C]\uFF1A<code class="md-code">0</code> <br class="md-br"></td>\n</tr>\n\n  </table><p><br></p>\n<h3 class="md-h3">steps \u6570\u7EC4\u9879</h3><table class="md-table">\n    <tr class="md-tr">\n<th class="md-th">\u540D\u79F0</th>\n<th class="md-th">\u63CF\u8FF0</th>\n</tr>\n\n    <tr class="md-tr">\n<td class="md-td"><code class="md-code">title</code></td>\n<td class="md-td">[\u8BF4\u660E]\uFF1A\u6B65\u9AA4\u540D\u79F0\u3002<br class="md-br">[\u7C7B\u578B]\uFF1A<code class="md-code">String</code><br class="md-br">\u9ED8\u8BA4\u503C\uFF1A<code class="md-code">&quot;&quot;</code> <br class="md-br"></td>\n</tr>\n<tr class="md-tr">\n<td class="md-td"><code class="md-code">desc</code></td>\n<td class="md-td">[\u8BF4\u660E]\uFF1A\u6B65\u9AA4\u63CF\u8FF0\u3002<br class="md-br">[\u7C7B\u578B]\uFF1A<code class="md-code">String</code><br class="md-br">[\u9ED8\u8BA4\u503C]\uFF1A<code class="md-code">&quot;&quot;</code> <br class="md-br"></td>\n</tr>\n\n  </table><h2 class="md-h2">Link</h2><table class="md-table">\n    <tr class="md-tr">\n<th class="md-th"></th>\n<th class="md-th">\u5730\u5740</th>\n</tr>\n\n    <tr class="md-tr">\n<td class="md-td"></td>\n<td class="md-td">steps \u7EC4\u4EF6\u6587\u6863 <br class="md-br"> <a href="https://meili.github.io/min/docs/minui/index.html#steps" class="md-a">https://meili.github.io/min/docs/minui/index.html#steps</a><br class="md-br"></td>\n</tr>\n<tr class="md-tr">\n<td class="md-td"></td>\n<td class="md-td">steps \u7EC4\u4EF6\u6E90\u7801 <br class="md-br"> <a href="https://github.com/meili/minui/tree/master/packages/wxc-steps" class="md-a">https://github.com/meili/minui/tree/master/packages/wxc-steps</a><br class="md-br"></td>\n</tr>\n<tr class="md-tr">\n<td class="md-td"></td>\n<td class="md-td">MinUI \u7EC4\u4EF6\u5E93 <br class="md-br"> <a href="https://github.com/meili/minui" class="md-a">https://github.com/meili/minui</a> <br class="md-br"></td>\n</tr>\n\n  </table><h2 class="md-h2">Preview</h2><p><img src="https://s10.mogucdn.com/mlcdn/c45406/171107_1cf7e9kbg5bi3l0ahj4ghb627jeb1_480x480.jpg_225x999.jpg" alt="steps"></p>\n<h2 class="md-h2">ChangeLog</h2><h4 class="md-h4">v1.0.3\uFF082018.01.04\uFF09</h4><ul>\n<li>\u6B65\u9AA4\u63CF\u8FF0\u6837\u5F0F\u4FEE\u6539</li>\n</ul>\n<h4 class="md-h4">v1.0.2\uFF082017.11.02\uFF09</h4><ul>\n<li>update .npmignore</li>\n</ul>\n<h4 class="md-h4">v1.0.1\uFF082017.10.24\uFF09</h4><ul>\n<li>\u521D\u59CB\u7248\u672C</li>\n</ul>\n',
      demoDefault: '<code class="lang-html md-code"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span><br/><span class="md--tab"></span><span class="hljs-tag">&lt;<span class="hljs-name">wxc-steps</span> <span class="hljs-attr">steps</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{{steps}}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">current</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{{current}}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">wxc-steps</span>&gt;</span><br/><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span><br/><br/><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><br/><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {<br/><span class="md--tab"></span><span class="hljs-attr">config</span>: {<br/><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-attr">usingComponents</span>: {<br/><span class="md--tab"></span><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-string">\'wxc-steps\'</span>: <span class="hljs-string">\'@minui/wxc-steps\'</span><br/><span class="md--tab"></span><span class="md--tab"></span>}<br/><span class="md--tab"></span>},<br/><span class="md--tab"></span><span class="hljs-attr">data</span>: {<br/><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-attr">steps</span>: [{<br/><span class="md--tab"></span><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-attr">title</span>: <span class="hljs-string">\'\u6B65\u9AA41\'</span>,<br/><span class="md--tab"></span><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-attr">desc</span>: <span class="hljs-string">\'\u6CE8\u518C\uFF0C\u767B\u5F55\'</span><br/><span class="md--tab"></span><span class="md--tab"></span>}, {<br/><span class="md--tab"></span><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-attr">title</span>: <span class="hljs-string">\'\u6B65\u9AA42\'</span>,<br/><span class="md--tab"></span><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-attr">desc</span>: <span class="hljs-string">\'\u8FDB\u5165\u8BE6\u60C5\u9875\uFF0C\u70B9\u51FB\u7ACB\u5373\u8D2D\u4E70\'</span><br/><span class="md--tab"></span><span class="md--tab"></span>}, {<br/><span class="md--tab"></span><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-attr">title</span>: <span class="hljs-string">\'\u6B65\u9AA43\'</span>,<br/><span class="md--tab"></span><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-attr">desc</span>: <span class="hljs-string">\'\u652F\u4ED8\u6210\u529F\'</span><br/><span class="md--tab"></span><span class="md--tab"></span>}],<br/><span class="md--tab"></span><span class="md--tab"></span><span class="hljs-attr">current</span>: <span class="hljs-number">1</span><br/><span class="md--tab"></span>},<br/><span class="md--tab"></span><span class="hljs-attr">methods</span>: {}<br/>}<br/></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><br/><br/><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><br/><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span><br/></span></code>'
    }
  },
  onShareAppMessage: function () {
    return {
      title: '步骤条 - MinUI小程序组件库',
      path: '/pages/steps/index'
    };
  }
});