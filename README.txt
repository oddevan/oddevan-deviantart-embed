=== Plugin Name ===
Contributors: oddevan
Tags: embed, deviantart
Requires at least: 5.3
Tested up to: 5.5
Stable tag: trunk
Requires PHP: 7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Embed a work from DeviantArt into a post using the block editor.

== Description ==

This plugin provides a block for the WordPress block editor that can automatically embed a work from DeviantArt
into a post. It uses the DeviantArt oEmbed API to pull the image and corresponding information and craft the
embedded image.

== Frequently Asked Questions ==

= Why should I use this plugin? =

This plugin loads the work directly from DeviantArt's servers, so it avoids adding more data to your media library.
It also automatically links the work back to the original page, so your visitors can connect with the original
artist!

= Why isn't the description/user avatar/other data displayed? =

This plugin uses [DeviantArt's oEmbed API][da-api], which does not contain much information besides the artist and title.

[da-api]: https://www.deviantart.com/developers/oembed

= How can I contribute to this plugin? =

Development takes place in [the GitHub repo][gh]. You are encouraged to file issues or contribute code if you feel so inclined!

[gh]: https://github.com/oddevan/oddevan-deviantart-embed

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is stored in the /assets directory.
2. This is the second screen shot

== Changelog ==

= 1.0 =
* Initial release

== Upgrade Notice ==

= 1.0 =
* Initial release