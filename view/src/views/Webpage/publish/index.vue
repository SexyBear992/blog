<template>
  <div class="publish">
    <pubNav class="pubNav" :titlep="title" :contentp="content" :pic="pic" />
    <div class="titlebox">
      <input type="text" placeholder="请输入标题（最多20字）" class="title" v-model="title" />
    </div>
    <editHtml
      :catchData="catchData"
      :noticeContent="noticeContent"
      class="editHtml"
      @imgname="imgname"
    />
  </div>
</template>

<script>
import editHtml from "@/components/publish/editHtml.vue";
import pubNav from "@/components/publish/pubNav.vue";
export default {
  name: "publish",
  components: {
    editHtml,
    pubNav
  },
  data() {
    return {
      title: "",
      pic: "",
      catchData: html => {
        this.content = html;
      },
      noticeContent: "",
      content: ""
    };
  },
  methods: {
    imgname(val) {
      // console.log(val);
      this.pic = val;
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.$axios
        .post("/articleDetails", {
          articleid: this.$route.query.id
        })
        .then(res => {
          this.pic = res.data.data.res
          this.title = res.data.data.title,
          this.noticeContent = res.data.data.content
        })
        .catch(err => {
          console.log(err);
        });
    } else {
    }
  },
  watch: {
    content() {
      //   console.log(this.content);
    },
    pic() {
      // console.log(this.pic);
    }
  }
};
</script>
<style scoped>
.pubNav {
  position: fixed;
  width: 100%;
  border-bottom: solid 1px #e6e6e6;
  /* background-color: #777; */
}

input[type="text"] {
  -webkit-appearance: none; /*去除原样式*/
  -o-appearance: none;
  appearance: none;
  width: 99.5%;
  height: 50px;
  border: none;
  position: relative;
  outline: none; /*去除外边框*/
  font-size: 25px;
  padding-left: 5px;
  font-weight: bold;
  /* background-color: #f3f3f3; */
}
.titlebox {
  margin: 0 auto;
  width: 900px;
  padding-top: 100px;
}
.editHtml {
  width: 900px;
  margin: 0 auto;
  overflow: hidden;
}
>>> .w-e-toolbar {
  border: 1px solid #eee !important;
  border-left: none !important ;
  border-right: none !important;
  background-color: transparent !important;
}
>>> .w-e-text-container {
  height: 100% !important;
  padding-bottom: 170px;
  /* background-color: #eee; */
  border: none !important;
  width: 102.5% !important;
}
</style>