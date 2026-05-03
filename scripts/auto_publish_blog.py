# Blog Auto-Publish Script
# This script moves the latest blog draft to the public blog directory and updates the homepage with a link.

import os
import shutil
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRAFTS_DIR = os.path.join(ROOT, 'drafts')
BLOG_DIR = os.path.join(ROOT, 'dope-cloud-teacher', 'blog')
HOMEPAGE = os.path.join(ROOT, 'dope-cloud-teacher', 'index.html')

def find_latest_blog_draft():
    today = datetime.now().strftime('%Y-%m-%d')
    blog_drafts = []
    for root, dirs, files in os.walk(DRAFTS_DIR):
        for file in files:
            if file.endswith('-blog-draft.md'):
                blog_drafts.append(os.path.join(root, file))
    if not blog_drafts:
        return None
    return max(blog_drafts, key=os.path.getmtime)

def publish_blog():
    latest = find_latest_blog_draft()
    if not latest:
        print('No blog drafts found.')
        return
    if not os.path.exists(BLOG_DIR):
        os.makedirs(BLOG_DIR)
    dest = os.path.join(BLOG_DIR, os.path.basename(latest).replace('-draft', ''))
    shutil.copyfile(latest, dest)
    print(f'Published blog: {dest}')
    # Optionally, update homepage with a link (simple append)
    with open(HOMEPAGE, 'r', encoding='utf-8') as f:
        html = f.read()
    if 'Latest Blog Post' not in html:
        insert = f'<div class="blog-link"><a href="blog/{os.path.basename(dest)}">Latest Blog Post: {os.path.basename(dest)}</a></div>'
        html = html.replace('</header>', f'</header>\n{insert}')
        with open(HOMEPAGE, 'w', encoding='utf-8') as f:
            f.write(html)
        print('Homepage updated with blog link.')

if __name__ == '__main__':
    publish_blog()
