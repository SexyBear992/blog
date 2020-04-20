<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      editorContent: ""
    };
  },
  watch: {
    noticeContent() {
      this.editor.txt.html(this.noticeContent);
    }
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ["catchData", "noticeContent"], // 接收父组件的方法
  mounted() {
    var this__ = this
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    // http://111.230.149.24:80/pic
    this.editor.customConfig.uploadImgServer = "http://111.230.149.24:80/pic"; //改为接口
    this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    (this.editor.customConfig.uploadImgHeaders = {
      Accept: "*/*z"
    }),
      (this.editor.customConfig.uploadImgHooks = {
        customInsert: function(insertImg, result, editor) {
          var url = "http://111.230.149.24:80/images/pic/" + result.data;
          insertImg(url);
          this__.$emit("imgname", result.data);
        }
      });
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.uploadFileName = "pic";
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "image", //图片
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.create(); // 创建富文本实例
  },
  methods: {}
};
</script>