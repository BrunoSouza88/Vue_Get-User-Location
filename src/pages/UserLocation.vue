<template>
  <section class="ui two column centered grid">
    <div class="column">
      <form class="ui segment large form">
        <div class="ui message red"></div>
        <div class="ui segment">
          <div class="field">
            <div class="ui right icon input larg">
              <input type="text" placeholder="Enter your address">
              <i class="dot circle link icon"></i>
            </div>
          </div>
        </div>
        <button class="ui button">Go</button>
      </form>
    </div>
  </section>
</template>


<style>
  .ui.button,
  .dot.circle.icon {
    background-color: #ff5a5f;
    color: white;
  }
</style>