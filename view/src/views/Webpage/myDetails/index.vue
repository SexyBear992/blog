<template>
  <div class="myDetails">
    <indexNav />

    <div class="box">
      <author class="author" :details="details" />
      <myMain class="myMain" :details="details" />
    </div>
    <comment class="comment" :details="details" />
  </div>
</template>
<script>
import indexNav from "@/components/index/indexNav";
import author from "@/components/myDetails/author.vue";
import myMain from "@/components/myDetails/myMain.vue";
import comment from "@/components/myDetails/comment.vue";

export default {
  name: "myDetails",
  data() {
    return {
      details: []
    };
  },
  components: {
    indexNav,
    author,
    myMain,
    comment
  },
  mounted() {
    this.$axios
      .post("/articleDetails", {
        articleid: this.$route.query.id
      })
      .then(res => {
        // console.log(res);
        this.details = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.box {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
}
.author {
  position: sticky;
  position: -webkit-sticky;
  top: 30px;
  width: 300px;
  margin-top: 30px;
  padding-bottom: 20px;
  /* height: 300px; */
}
.myMain {
  margin-top: 10px;
  width: 900px;
  /* height: 1900px; */
  margin-left: 10px;
  /* background-color: #ccc; */
}
.comment {
  width: 900px;
  margin: 0 auto;
  padding-top: 20px;
  /* padding-left: 300px; */
}
</style>