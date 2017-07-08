const log = console.log.bind(console)
const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)
const appendHtml = (element, html) => element.insertAdjacentHTML("beforeend", html)
const bindEvent = (element, eventName, callback) => element.addEventListener(eventName, callback)
const bindAll = (selector, eventName, callback) => {
    var elements = es(selector)
    for(var i = 0; i < elements.length; i++) {
        var element = elements[i]
        bindEvent(element, eventName, callback)
    }
}
const removeClassAll = className => {
    var selector = "." + className
    var elements = es(selector)
    for(var i = 0; i < elements.length; i++) {
        var element = elements[i]
        element.classList.remove(className)
    }
}
const themeAll =[
    {"theme": "#353d40" },                     //太空黑
    {"theme": "rgba(242, 70, 70, 0.34)" },   //粉色
    {theme: "rgba(118, 195, 221, 0.73)" }  //天空蓝
    ]
//轮播图功能
const bindButtonDot = () => {
    var togglePic = e(".togglePic")
    togglePic.addEventListener("click", (event) => {
        var self = event.target
        if (self.classList.contains("button")) {
            var offset = parseInt(self.dataset.offset)
            var numberOfPic =parseInt(togglePic.dataset.pic)
            var current =parseInt(togglePic.dataset.current)
            var next = ( offset + current + numberOfPic ) % numberOfPic
            togglePic.dataset.current = next
            e(".picBox").style.transform = `translateX(${next * (-100)}vw)`
            removeClassAll("white")
            var dotId = "#dot-" + next
            e(dotId).classList.add("white")
        }
        if (self.classList.contains("dot")) {
            var index = parseInt(self.dataset.index)
            togglePic.dataset.current = index
            e(".picBox").style.transform = `translateX(${index * (-100)}vw)`
            removeClassAll("white")
            self.classList.add("white")
        }
    })
}
//轮播图定时器
const togglePic = () => {
    setInterval(() => {
        var togglePic = e(".togglePic")
        var numberOfPic =parseInt(togglePic.dataset.pic)
        var current =parseInt(togglePic.dataset.current)
        var next = (current + 1 ) % numberOfPic
        togglePic.dataset.current = next
        e(".picBox").style.transform = `translateX(${next * (-100)}vw)`
        removeClassAll("white")
        var dotId = "#dot-" + next
        e(dotId).classList.add("white")
    }, 6000)
}
//todo页面功能
const bindTodo = () => {
    var todoList = e(".todoList")
    var dotTheme = e(".dotTheme")
    todoList.addEventListener("click", (event) => {
        var self = event.target
        if (self.classList.contains("dotTheme")) {
            var index = parseInt(self.dataset.index)
            todoList.dataset.theme = index
            e(".todoTheme").style.background = themeAll[index].theme
            e(".phoneTheme").src = `img/todoList/${index}.png`
        }
    })
}
//todo页面定时器
const toggleTheme = () => {
    setInterval(() => {
        var todoList = e(".todoList")
        var theme = parseInt(todoList.dataset.theme)
        var all = parseInt(todoList.dataset.all)
        var next = (theme + 1) % all
        todoList.dataset.theme = next
        e(".todoTheme").style.background = themeAll[next].theme
        e(".phoneTheme").src = `img/todoList/${next}.png`
    }, 4000)
}
//简历页面切换功能
const toggleResume = () => {
    var resumePoint = e(".resumePoint")
    resumePoint.addEventListener("click", (event) => {
        var self = event.target
        if (self.classList.contains("point")) {
            var index = parseInt(self.dataset.index)
            e(".resumeContainer").style.transform = `translateX(${index * (-100)}vw)`
            removeClassAll("color")
            self.classList.add("color")
        }
    })
    pointHidden()
}
//简历按钮隐藏
const pointHidden = () => {
    var page = e(".allPage").dataset.page
    page = parseInt(page)
    if (page != 4 ) {
        e(".resumePoint").classList.add("hidden")
    } else{
        e(".resumePoint").classList.remove("hidden")
    }
}
//导航栏切换大页面功能
const bindNav = () => {
    var header = e(".header")
    header.addEventListener("click", (event) => {
        var self = event.target
        if (self.classList.contains("nav-li")) {
            var index = parseInt(self.dataset.nav)
            e(".allPage").dataset.page = index
            e(".allPage").style.transform = `translateY(${index * (-100)}vh)`
            e(".line").style.transform = `translateX(${index * (3.5)}rem)`
            removeClassAll("highlight")
            self.classList.add("highlight")
        }
        toggleFooter()
        pointHidden()
    })
}
//点击右下角图标，上下切换大页面
const bindFooter = () => {
    var header = e(".header")
    var footer = e(".footer")
    var allPage = e(".allPage")
    footer.addEventListener("click", (event) => {
        var self = event.target
        if (self.classList.contains("pageButton")) {
            var offset = parseInt(self.dataset.offset)
            var numberOfPage = parseInt(allPage.dataset.all)
            var current = parseInt(allPage.dataset.page)
            var next = (offset + current + numberOfPage) % numberOfPage
            var navId = "#nav-" + next
            allPage.dataset.page = next
            allPage.style.transform = `translateY(${next * (-100)}vh)`
            e(".line").style.transform = `translateX(${next * (3.5)}rem)`
            removeClassAll("highlight")
            e(navId).classList.add("highlight")
        }
        toggleFooter()
        pointHidden()
    })
}
//首尾页面分别隐藏向上、向下图标
const toggleFooter = () => {
    var page = parseInt(e(".allPage").dataset.page)
    if (page == 0) {
        removeClassAll("hidden")
        e(".prevPage").classList.add("hidden")
    } else if (page == 4) {
        removeClassAll("hidden")
        e(".nextPage").classList.add("hidden")
    } else if (0 < page < 4) {
        removeClassAll("hidden")
        e(".pageButton").classList.remove("hidden")
    }
}
//载入页面时，显示的是首页，隐藏向上图标
const hiddenFooter = () => {
    var page = parseInt(e(".allPage").dataset.page)
    if (page == 0) {
        e(".prevPage").classList.add("hidden")
    }
    pointHidden()
}
//移动端，点击readmore按钮切换
const bindReadMore = () => {
    var readMusic = e(".readMusic")
    var readBanner = e(".readBanner")
    readMusic.addEventListener("click", () => {
        e(".musicPlayer").classList.toggle("notShow")
        e(".musicIntroduce").classList.toggle("notShow")
    })
    readBanner.addEventListener("click", () => {
        e(".banner").classList.toggle("notShow")
        e(".bannerIntroduce").classList.toggle("notShow")
})
}

//唯一函数入口
const main = () => {
    bindButtonDot()
    togglePic()
    bindTodo()
    toggleTheme()
    toggleResume()
    bindNav()
    bindFooter()
    hiddenFooter()
    bindReadMore()
}

main()