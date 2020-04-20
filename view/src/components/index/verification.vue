<template>
  <div class="verification">
    <canvas id="canvas" width="100" height="20" @click="verification" ref="verification">不支持canvas</canvas>
  </div>
</template>
<script>
export default {
  name: "verification",
  mounted() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.height = canvas.height;
    var sarr = [];
    var strState =
      "abcdefghijklmnopqrstuvwsyzABCDEFGHIJKLMNOPQRSTUVWSYZ1234567890";

    function randNum(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    }
    for (var i = 0; i < 5; i++) {
      var fontSize = randNum(14, 20);
      var colors = `rgb(${randNum(0, 200)},${randNum(0, 200)},${randNum(
        0,
        200
      )})`;
      var str = strState[randNum(0, strState.length)];
      context.beginPath();
      context.font = "italic " + fontSize + "px" + " Arial";
      context.fillStyle = colors;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(str, 15 * (i + 1), 10);
      sarr.push(str);
    }
    this.$emit("VArr", sarr);
  },
  methods: {
    verification() {
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");
      canvas.height = canvas.height;
      var sarr = [];
      var strState =
        "abcdefghijklmnopqrstuvwsyzABCDEFGHIJKLMNOPQRSTUVWSYZ1234567890";

      function randNum(min, max) {
        return parseInt(Math.random() * (max - min) + min);
      }
      for (var i = 0; i < 5; i++) {
        var fontSize = randNum(14, 20);
        var colors = `rgb(${randNum(0, 200)},${randNum(0, 200)},${randNum(
          0,
          200
        )})`;
        var str = strState[randNum(0, strState.length)];
        context.beginPath();
        context.font = "italic " + fontSize + "px" + " Arial";
        context.fillStyle = colors;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(str, 15 * (i + 1), 10);
        sarr.push(str);
      }
      this.$emit("VArr", sarr);
    }
  }
};
</script>

<style scoped>
#canvas {
  border: 1px solid #999;
  background: transparent;
}
</style>