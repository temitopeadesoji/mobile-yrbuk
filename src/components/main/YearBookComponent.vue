<template>
    <div class="">
        <vue-headful title="Yearbooks | Yrbuk" />
        <!-- Header -->
    <header>
        <div class="container header inner">
            <NavbarComponent></NavbarComponent>
            <div class="banner-content">
                <h1 class="title">YEARBOOKS</h1>
                <p class="body">Your online contact book</p>
            </div>
        </div>
    </header>
    <div class="section-1-a col-md-12">
        <div class="content">
            <h3>Psst! Features are limited when not logged in</h3>
            <button>SIGN UP</button>
        </div>
    </div>
    <div class="section-2-a col-md-12">

    </div>
    <DividerComponent></DividerComponent>
    <FooterComponent></FooterComponent>
    </div>
</template>
<script>
    import DividerComponent from "./DividerComponent.vue"
    import NavbarComponent from "./NavbarComponent.vue"
    import FooterComponent from "./FooterComponent.vue"

    export default {
        components: {
            DividerComponent,
            NavbarComponent,
            FooterComponent
        }
    }
</script>
<style lang="css" scoped>
header {
  background: url(/imgs/banner-yb.jpg) no-repeat;
  width: 100%;
  height: 370px;
  background-color: #000000;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
.banner-content {
  margin-top: 120px;
  text-align: center;
}

.banner-content .title {
  font-size: 27px;
  word-spacing: 10px;
  letter-spacing: 5px;
  font-weight: 600;
}

.banner-content .body {
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 4px;
}

.section-1-a {
  min-height: 50px;
  background: #ffff8d;
  text-align: center;
}


.section-1-a .content {
    margin:7px 350px;
}

.section-1-a .content h3 {
    float: left;
    color: #000000;
    font-weight: 600;
    margin-bottom: 25px !important;
}

.section-1-a .content button {
  /* margin-right: 50px; */
  margin-top: 15px;
  background: transparent;
  color: #454526;
  border: 1px solid #454526;
  border-radius: 2px;
  padding: 7px 33px;
  float: right;
}

</style> 