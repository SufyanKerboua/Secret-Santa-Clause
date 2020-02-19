<template>
    <div class="autocomplete_token">
      <div>
          <div class="tokens_list">
            <mdb-badge v-for="(item, index) in notAssignedParticipants" :key="item"
            pill
            class="badge_participant"
            color="primary-color"
            close
            > {{ item }} <span @click="deleteToken(index)"> x </span>
            </mdb-badge>
          </div>
      </div>

      <div class="tokens_adder">
        <input type="text" 
        @keydown.enter = 'enter'
        @keydown.down = 'down'
        @keydown.up = 'up' 
        v-model="query" 
        placeholder="Add non-assignable participant">
      
        <div class="options" v-bind:class="{'open':openSuggestion}" ref="optionsList">
          <ul class="dropdown-menu" >
            <li v-for="(match, index) in matches"
            :key="index"
            :class="{'selected': (current == index)}"
            @click="itemClicked(match[filterBy])"
            v-text="match[filterBy]" >
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>

import { mdbBadge } from "mdbvue";

  export default {
    name: "AutocompleteToken",
    components: {
      mdbBadge
    },
    data() {
      return {
        itemListHeight: 42,
        query: '',
        open: false,
        current: 0
      };
    },
    props: {
      suggestions: Array,
      notAssignedParticipants: Array,
      filterBy: String
    },
    computed: {
      //Filtering the suggestion based on the input
      matches() {
        if (this.query == '') {
          return [];
        }
        let tmpTab = this.suggestions.filter((item) => item[this.filterBy].toLowerCase().includes(this.query.toLowerCase()))
        return tmpTab.filter((item) => { return !this.notAssignedParticipants.includes(item[this.filterBy]) });
      },
      openSuggestion() {
        return this.query !== '' && this.matches.length != 0;
      }
    },
    methods: {
      //When click on item
      itemClicked(val) {
        this.notAssignedParticipants.push(val);
        this.query = ''
        console.log(val);
      },
      deleteToken(index) {
        this.notAssignedParticipants.splice(index, 1);
      },
      //When enter pressed on the input
      enter() {
        this.notAssignedParticipants.push(this.matches[this.current][this.filterBy]);
        this.current = 0;
      },
      //When up pressed while suggestions are open
      up() {
        if (this.current > 0)
            this.current--;
        this.scrollToItem();
      },
      //When up pressed while suggestions are open
      down() {
        if (this.current < this.matches.length - 1)
            this.current++;
        this.scrollToItem();
      },
      scrollToItem() {
        this.$refs.optionsList.scrollTop = this.current * this.itemListHeight;
      }
    },
    mounted() {
    }
  };
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

span {
  color: rgba(0,0,0,0.55);
  margin: 2px;
}

.autocomplete_token {
  float: left;
}

.tokens_adder, .tokens_list {
    margin-top: 10px;
    margin-bottom: 10px;
}

.tokens_adder input {
  width: 240px;
}

.badge_participant {
  font-size: 15px;
}

.options {
  position: absolute;
}

.open .dropdown-menu {
  display: block;
}

.dropdown-menu {
  width: 100%;
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
}

.dropdown-menu li {
  border-bottom: 1px solid lightgray;
  padding: 10px;
  cursor: pointer;
  background: #f1f1f1;
}

.popover {
    min-height: 50px;
    border: 2px solid lightgray;
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 3px;
    text-align: center;
}
.popover input {
    width: 95%;
    margin-top: 5px;
    height: 40px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid lightgray;
    padding-left: 8px;
}
.options {
    max-height: 150px;
    overflow-y: scroll;
    margin-top: 5px;
}
.options ul {
    list-style-type: none;
    text-align: left;
    padding-left: 0;
}
.options ul li {
    border-bottom: 1px solid lightgray;
    padding: 10px;
    cursor: pointer;
    background: #f1f1f1;
}
.options ul li:first-child {
    border-top: 2px solid #d6d6d6;
}

.options ul li:not(.selected):hover {
    background: #8c8c8c;
    color: #fff;
}
.options ul li.selected {
    background: #4285f4;
    color: #fff;
    font-weight: 600;
}

</style>

