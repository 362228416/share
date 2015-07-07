一开始让我开发ios我是拒绝的，因为看到oc的语法，略感蛋疼，实在是不想套进去，可能苹果也意识到了这个问题，所以推出了swift，我研究了一下，感觉这才像是编程语言，起码人性化多了，但是Xcode代码补全弱爆了，可能是idea用惯了，xcode真心不习惯了，装了插件也感觉好弱，折腾没多久，就搁置了

最近接触了`reactjs`，感觉它的思想很不错，组件化，而且异常的简单，只需要会html + js ，轻松掌握，没什么复杂的概念，react native 则是基于react，旨在用react开发本地app（目前只支持ios，android估计要到10月份才支持），web开发者，可以轻松的开发ios，而不用学习object-c，swift，

于是我就用 `react native` 模仿做的一个美团客户端首页

> 练练手，只要是布局，有很多代码可以供大家参考，比如使用第三方开源库，来实现一些效果，自定义头部、图标、滑动切换效果，列表，flex 布局

用的的组件：

* NavigatorIOS
* react-native-swiper
* react-native-icons
* react-native-navbar
* ListView
* WebView

### 运行步骤

```shell
  1、npm install
  2、用Xcode打开meituan.xcodeproj
  3、Commmand + R
```

界面是模仿官网的应用的

### 下面是效果

<img src="https://raw.githubusercontent.com/362228416/react-native-meituan/master/1.png"/>

<img src="https://raw.githubusercontent.com/362228416/react-native-meituan/master/2.png"/>

代码上传到github上面了，点击<a href="https://github.com/362228416/react-native-meituan/" target="_blank">react-native-meituan</a>查看
