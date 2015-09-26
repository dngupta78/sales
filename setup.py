from setuptools import setup, find_packages
import os

version = '0.0.1'

setup(
    name='sales',
    version=version,
    description='This app is for flat sales invoice',
    author='deepak',
    author_email='dngupta78@gmail.com',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=("frappe",),
)
