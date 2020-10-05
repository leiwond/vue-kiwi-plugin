<template>
    <v-layout class="ui-editor" :class="cssClassError" row wrap>
        <v-flex xs12 pa-0 ma-0>
            <editor-menu-bar
                :editor="editor"
                v-slot="{ commands, isActive, getMarkAttrs }">
                <v-toolbar dense flat tile>
                    <v-btn
                        flat
                        active-class="is-active"
                        max-width="14px"
                        :class="cssClassActive(isActive.heading({ level: 1 }))"
                        @click="commands.heading({ level: 1 })"
                        data-qa="editor button h1">
                        <strong>H1</strong>
                    </v-btn>

                    <v-btn
                        flat
                        active-class="is-active"
                        max-width="14px"
                        :class="cssClassActive(isActive.heading({ level: 2 }))"
                        @click="commands.heading({ level: 2 })"
                        data-qa="editor button h2">
                        <strong>H2</strong>
                    </v-btn>

                    <v-btn
                        flat
                        active-class="is-active"
                        max-width="14px"
                        :class="cssClassActive(isActive.heading({ level: 3 }))"
                        @click="commands.heading({ level: 3 })"
                        data-qa="editor button h3">
                        <strong>H3</strong>
                    </v-btn>

                    <v-divider class="ml-2 mr-2" vertical inset />

                    <v-btn
                        flat
                        active-class="is-active"
                        :class="cssClassActive(isActive.bold())"
                        @click="commands.bold"
                        data-qa="editor button bold">
                        <v-icon>icon-format-bold</v-icon>
                    </v-btn>

                    <v-btn
                        flat
                        active-class="is-active"
                        :class="cssClassActive(isActive.underline())"
                        @click="commands.underline"
                        data-qa="editor button underline">
                        <v-icon>icon-format-underlined</v-icon>
                    </v-btn>

                    <v-btn
                        flat
                        active-class="is-active"
                        :class="cssClassActive(isActive.italic())"
                        @click="commands.italic"
                        data-qa="editor button italic">
                        <v-icon>icon-format-italic</v-icon>
                    </v-btn>

                    <v-divider class="ml-2 mr-2" vertical inset />

                    <v-btn
                        flat
                        active-class="is-active"
                        :class="cssClassActive(isActive.bullet_list())"
                        @click="commands.bullet_list"
                        data-qa="editor button list bulleted">
                        <v-icon>icon-format-list-bulleted</v-icon>
                    </v-btn>

                    <v-btn
                        flat
                        active-class="is-active"
                        :class="cssClassActive(isActive.ordered_list())"
                        @click="commands.ordered_list"
                        data-qa="editor button list numbered">
                        <v-icon>icon-format-list-numbered</v-icon>
                    </v-btn>

                    <v-divider class="ml-2 mr-2" vertical inset />

                    <v-btn
                        flat
                        active-class="is-active"
                        :class="cssClassActive(isActive.link())"
                        @click="showLinkMenu(getMarkAttrs('link'))"
                        data-qa="editor button link">
                        <v-icon>icon-link</v-icon>
                    </v-btn>

                    <ui-dialog
                        v-model="link.showMenu"
                        hasActions
                        persistent
                        width="600px"
                        @closed="hideLinkMenu"
                        data-qa="editor link menu"
                        :title="isActive.link() ? 'Link bearbeiten' : 'Link hinzufügen'">
                        <v-text-field
                            v-model="link.url"
                            ref="linkInput"
                            :error-messages="validationError($v.link.url)"
                            @input="$v.link.url.$touch()"
                            data-qa="editor link input"
                            label="Website Link"/>

                        <v-btn
                            slot="actions"
                            flat
                            color="primary"
                            @click="hideLinkMenu">
                            Abbrechen
                        </v-btn>
                        <v-btn
                            slot="actions"
                            depressed
                            color="primary"
                            @click="setLinkUrl(commands.link, link.url)">
                            Übernehmen
                        </v-btn>
                    </ui-dialog>
                </v-toolbar>
            </editor-menu-bar>
        </v-flex>
        <v-flex xs12 pa-0 ma-0 data-qa="editor content">
            <editor-content :editor="editor" ref="editorContent"/>
            <div class="v-messages theme--light error--text">
                <div class="v-messages__wrapper">
                    <div class="v-messages__message">{{ errorMessages }}</div>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/styles/config';

    .ui-editor {
        .ProseMirror {
            font-family: Arial, Helvetica, sans-serif;
            border-bottom: 1px solid $color-gray7;
            background-color: #ffffff;
            padding: $padding-3 $padding-3 0 $padding-3;
            outline: 0 solid transparent;
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            min-height: 200px;

            &-focused {
                border-bottom: 2px solid $color-green3;
            }

            // editor content styling
            h1 {
                font-size: 30px; line-height: 34px;
            }

            h2 {
                font-size: 21px; line-height: 25px;
            }

            h3 {
                font-size: 18px; line-height: 22px;
            }

            a:link, a:visited {
                color: #619f00 !important; font-weight: normal; text-decoration: none;
            }
        }

        &.has-errors {
            .ProseMirror {
                border-bottom: 2px solid $color-red1!important;
            }
        }

        .v-toolbar__content {
            .v-btn {
                min-width: auto;
                padding: 0 $padding-2;
                margin: $padding-2 $padding-1;

                &.is-active {
                    background-color: $color-gray4;
                }
            }

            .v-btn:first-child {
                margin-left: 0;
            }
        }
    }
</style>

<script>
import { validationMixin } from 'vuelidate';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Heading,
  Bold,
  Underline,
  Italic,
  History,
  Link,
  BulletList,
  OrderedList,
  ListItem,
} from 'tiptap-extensions';
import { website } from '../util/validationRules';
import validationErrorMixin from '../util/mixins/validationErrorMixin';

export default {
  props: {
    value: { type: String, required: true },
    errorMessages: { type: String, default: '' },
  },

  data: () => ({
    editor: null,
    editorChange: false,
    link: {
      url: '',
      showMenu: false,
    },
  }),

  computed: {
    cssClassError() {
      return this.errorMessages.length > 0 ? 'has-errors' : '';
    },
  },

  watch: {
    value(val) {
      if (this.editor && !this.editorChange) {
        this.editor.setContent(val, true);
      }
      this.editorChange = false;
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Underline(),
        new Italic(),
        new History(),
        new Link(),
        new BulletList(),
        new ListItem(),
        new OrderedList(),
      ],
      onUpdate: ({ getHTML }) => {
        this.editorChange = true;
        this.$emit('input', getHTML());
      },
      onBlur: () => {
        this.$emit('blur');
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },

  methods: {
    /**
     * If a change is triggered from outside e.g. applying a text template, the editor needs to
     * be reinitialized. This is an expensive process and should only be triggered manually.
     */
    reinitializeEditor() {
      this.editor.destroy();
      this.editor = this.initEditor();
    },

    showLinkMenu(attrs) {
      this.link.url = attrs.href || '';
      this.link.showMenu = true;
    },

    hideLinkMenu() {
      this.link.url = '';
      this.link.showMenu = false;
    },

    setLinkUrl(command, url) {
      if (this.$v.$invalid) {
        this.focusFirstInvalidField();
      } else {
        command({ href: url });
        this.hideLinkMenu();
      }
    },

    cssClassActive(condition) {
      return condition ? 'is-active' : '';
    },
  },

  components: {
    EditorContent,
    EditorMenuBar,
  },

  mixins: [
    validationMixin,
    validationErrorMixin,
  ],

  validations: {
    link: {
      url: {
        'Bitte gib einen gültigen Link beginnend mit https:// oder http:// ein': website,
      },
    },
  },
};
</script>
