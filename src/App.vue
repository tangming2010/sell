<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from 'components/header/Header';
  import {urlParse} from 'common/js/Util';

  const ERR_OK = 0;
  export default{
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      let id = this.seller.id;
      this.$http.get(`/api/seller?id=${this.seller.id}`).then(
        res => {
          let response = res.data;
          if (response.errno === ERR_OK) {
            this.seller = response.data;
            // this.seller = Object.assign({}, this.seller, response.data);
            this.$set(this.seller, 'id', id);
          }
        },
        err => {
          console.error(err);
        }
      );
    },
    components: {
      'v-header': Header
     }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)

</style>
