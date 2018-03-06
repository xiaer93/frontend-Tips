/* *
 * Created by winack on 2018/3/5 
 */
/*
* Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大
* （1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
* （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
*
* Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
* */
//创建promise
{
    let promise = new Promise(function(resolve, reject) {
        console.log('Promise');
        resolve();
    });
    promise.then(function() {
        console.log('resolved.');
    });
    console.log('Hi!');//输出顺序：Promise、Hi、resolved
}

//异步加载图片
function loadImageAsync(url) {
    return new Promise(function (resolve,reject) {
        const img=new Image();
        img.onload=function () {
            resolve(img);
        };
        img.onerror=function () {
            reject(new Error('Could not load image '+url));
        };
        img.src=url;
    })
}
let img=loadImageAsync("https://tse4-mm.cn.bing.net/th?id=OIP.bUBcrj03gRsbi7iIaogTbQE6DG&w=258&h=160&c=7&o=5&pid=1.7");
//then接受参数，第一个为resolve，第二个为reject
img.then(function (image) {
    console.log(image);
    document.body.appendChild(image);
},function (err) {
    console.log(err);
});

//ajax实例
const getJSON=function (url) {
  const promise=new Promise(function (resolve,reject) {
      const handler=function () {
          if(this.readyState!==4){
              return;
          }
          if(this.status===200){
              resolve(this.response)
          }else{
              reject(new Error(this.statusText));
          }
      };
      const client=new XMLHttpRequest();
      client.open('GET',url);
      client.onreadystatechange=handler;
      client.responseType='json';
      client.setRequestHeader('Accept',"application/json");
      client.send();
  });
  return promise;
};
getJSON("abc.json").then(function (json) {
   console.log(json); 
},function (error) {
    console.log(error);
});

//then方法返回的是一个新的Promise实例，因此可以链式调用！then等待调用他的Promise对象转为resolved状态！

//catch方法用于指定发生错误时的回调函数，是.then(null, rejection)的别名。（返回Promise对象实例）
{
    const promise = new Promise(function(resolve, reject) {
        throw new Error('test');
    });
    promise.catch(function(error) {
        console.log(error);
    });
}
{
    const promise = new Promise(function(resolve, reject) {
        reject(new Error('test'));
    });
    promise.catch(function(error) {
        console.log(error);
    });
}
{
    const promise = new Promise(function(resolve, reject) {
        resolve('ok');
        throw new Error('test');//如果 Promise 状态已经变成resolved，再抛出错误是无效的。
    });
    promise
        .then(function(value) { console.log(value) })
        .catch(function(error) { console.log(error) });
    // ok
}
//Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止
{
    getJSON('/post/1.json').then(function(post) {
        return getJSON(post.commentURL);
    }).then(function(comments) {
        // some code
    }).catch(function(error) {
        // 处理前面三个Promise产生的错误
    });
}

//跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
{
    const someAsyncThing = function() {
        return new Promise(function(resolve, reject) {
            // 下面一行会报错，因为x没有声明
            resolve(x + 2);
        });
    };
    someAsyncThing()
        .catch(function(error) {//一定要通过catch捕获Promise内部的错误！
            console.log('oh no', error);
        })
        .then(function() {
            console.log('carry on');
        });
}

//finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。


//Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
//const p = Promise.all([p1, p2, p3]);
// （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

//Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
//只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

//有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。
//如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
//Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

//Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

{
    const f = () => console.log('now');
    Promise.resolve().then(f);
    console.log('next');
// next
// now
}
{
    const f = () => console.log('now');
    (
        () => new Promise(
            resolve => resolve(f())
        )
    )();
    console.log('next');
// now
// next
}
{
    const f = () => console.log('now');
    Promise.try(f);//f是同步代码，则立即执行！是异步函数，则异步执行！
    console.log('next');
// now
// next
}

/*
* promise的链式调用与then的返回值有关系！http://es6.ruanyifeng.com/#docs/generator-async
* */