# -*- coding: utf-8 -*-
__author__ = 'stgavrilov'
import os
import codecs
from shutil import copyfile

columns = {
              u'index': {u'index': 0, u'name': u'№'},
              u'page_title': {u'index': 0, u'name': u'Страница'},
              u'template': {u'index': 0, u'name': u'Шаблон'},
              u'title': {u'index': 0, u'name': u'Title'},
              u'description': {u'index': 0, u'name': u'Description'},
              u'extra_keys': {u'index': 0, u'name': u'Доп ключи'},
         }


def open_site_map(sitemap_file):
    input_thread = open(sitemap_file)
    return input_thread


def read_table_data(line, page_info):

    line_cells = line.split(',')

    index = line_cells[columns[u'index'][u'index']]
    page_title = line_cells[columns[u'page_title'][u'index']]
    template = line_cells[columns[u'template'][u'index']]
    extra_keys = line_cells[columns[u'extra_keys'][u'index']]
    title = line_cells[columns[u'title'][u'index']]
    description = line_cells[columns[u'description'][u'index']]

    page_info[page_title] = {

         columns[u'index'][u'name']:index,
         columns[u'page_title'][u'name']:line_cells[columns[u'page_title'][u'index']].decode("utf-8"),
         columns[u'template'][u'name']:template,
         columns[u'extra_keys'][u'name']:extra_keys,
         columns[u'title'][u'name']:title,
         columns[u'description'][u'name']:description,
    }


def read_table(input_thread):
    page_info = {}
    lines = input_thread.readlines()

    for i, line in enumerate(lines):
        if i == 0:
            read_table_head(line)
            continue
        read_table_data(line, page_info)
    return page_info


def read_table_head(line):
    line_cells = line.strip().split(',')
    for col_index, cell in enumerate(line_cells):
        for key, value in columns.iteritems():
            if cell == value[u'name'].encode('utf8'):
                columns[key][u'index'] = col_index


def create_article_template_file_copy(template, template_dir_name, article_template_name):
    file_copy_name = template_dir_name + '\\' + article_template_name + '_.txt'
    copyfile(template, file_copy_name)
    return file_copy_name


def insert_data_in_template(file_copy_name, page_info):
    keyword = u'<keyword>'
    keyword_from_table = page_info[u'Title'].decode('utf-8')
    extra_keywords = u'<extra-keywords>'
    extra_keywords_from_table = page_info[u'Доп ключи'].decode('utf-8')
    brand = u'<brand>'
    brand_from_table = page_info[u'Страница']

    input_thread = codecs.open(file_copy_name, "r", "utf-8")
    file = input_thread.read()
    input_thread.close()
    file = file.replace(keyword, keyword_from_table)
    file = file.replace(extra_keywords, extra_keywords_from_table)
    file = file.replace(brand, brand_from_table)
    output_thread = codecs.open(file_copy_name, 'w', "utf-8")
    output_thread.write(file)
    output_thread.close()


def copy_template_to_dir_page(dir_name, page_info, templates):
    for template in templates:
        file_name = template.split('\\')[1]
        template_dir_name = template.split('\\')[0]
        article_template_name = file_name.replace('.txt', '')
        article_template_name_from_table = page_info[u'Шаблон'].replace('.php','')
        if article_template_name == article_template_name_from_table:
            file_copy_name = create_article_template_file_copy(template, template_dir_name, article_template_name)
            insert_data_in_template(file_copy_name, page_info)
            copyfile(file_copy_name, dir_name + '\\' + file_name)



def create_article_templates(dir_name, page_info):
    templates = []
    article_templates_dir = 'article_templates'
    create_template_from_one_template(article_templates_dir, page_info)
    find_templates(article_templates_dir, templates)
    copy_template_to_dir_page(dir_name, page_info, templates)


def create_template_from_one_template(article_templates_dir, page_info):
    template_file_name = u'{}/{}'.format(article_templates_dir, u'_template.txt')
    template_file_thread = open(template_file_name)
    curent_template_file_name = u'{}/{}'.format(article_templates_dir, page_info[u'Шаблон'].replace('.php', '.txt'))

    if not os.path.exists(curent_template_file_name):
        with open(curent_template_file_name, 'w') as f:
             f.write(template_file_thread.read())

def find_templates(dir_name, templates):

    for name in os.listdir(dir_name):
        path = os.path.join(dir_name, name)
        if os.path.isfile(path):
            templates.append(path)
        else:
            find_templates(path, templates)


def do_magick(pages_info):
    results_dir = u'results'
    if not os.path.exists(results_dir):
        os.makedirs(results_dir)
    for key, page_info in pages_info.iteritems():
        index = page_info[u'№']
        key = key.decode('utf-8').replace("/", "_").strip()
        dir_name = u'{}/{}_{}'.format(results_dir, index, key)
        dir_name = dir_name.replace('"', "").strip()

        if not os.path.exists(dir_name):
             os.makedirs(dir_name)

        create_article_templates(dir_name, page_info)


def create_extra_keys(pages_info):
    extra_keys_dir = u'extra_keys'
    extra_keys_templates =[]
    for name in os.listdir(extra_keys_dir):
        path = os.path.join(extra_keys_dir, name)
        if os.path.isfile(path):
            extra_keys_templates.append(path)



    for key, page_info in pages_info.iteritems():
        for extra_keys_template in extra_keys_templates:

            input_thread = codecs.open(extra_keys_template, "r", "utf-8")
            file = input_thread.read()
            file = file.lower()
            input_thread.close()

            extra_keys_template_name_from_table = page_info[u'Шаблон'].replace('.php', '')
            extra_keys_template_name = extra_keys_template.split('\\')[1].replace('_extra_keys.txt', '')
            if extra_keys_template_name_from_table == extra_keys_template_name:
                file_copy = file
                file_copy_name = extra_keys_template + '_result.txt'
                brand = u'<brand>'
                utf_key = key.decode('utf-8').strip()
                file_copy = file_copy.replace(brand, utf_key)
                output_thread = codecs.open(file_copy_name, 'a', "utf-8")
                output_thread.write(file_copy)
                output_thread.close()

if __name__ == '__main__':
    input_thread = open_site_map('sitemap.csv')
    pages_info = read_table(input_thread)
    create_extra_keys(pages_info)
    do_magick(pages_info)

    input_thread.close()