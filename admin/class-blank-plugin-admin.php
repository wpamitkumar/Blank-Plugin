<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://wpamitkumar.com/
 * @since      1.0.0
 *
 * @package    Blank_Plugin
 * @subpackage Blank_Plugin/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Blank_Plugin
 * @subpackage Blank_Plugin/admin
 * @author     Amit Dudhat <hello@wpamitkumar.com>
 */
class Blank_Plugin_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param    string $plugin_name The name of this plugin.
	 * @param    string $version     The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version     = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Blank_Plugin_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Blank_Plugin_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __DIR__ ) . 'build/admin/css/main.css', array( 'wp-components' ), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Blank_Plugin_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Blank_Plugin_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __DIR__ ) . 'build/admin/js/main.js', array(), $this->version, false );

	}

	/**
	 * Register the JavaScript for the option page admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_option_page_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Blank_Plugin_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Blank_Plugin_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name . '-optionpage', plugin_dir_url( __DIR__ ) . 'build/admin/js/optionpage.js', array( 'wp-api', 'wp-i18n', 'wp-components', 'wp-element' ), $this->version, true );

	}

	/**
	 * Callback function for Option page Content.
	 *
	 * @since    1.0.0
	 */
	public function blank_plugin_menu_callback() {
		echo '<div id="blank-plugin"></div>';
	}

	/**
	 * Register option page for Blank Plugin.
	 *
	 * @since    1.0.0
	 */
	public function blank_plugin_option_menu() {
		$page_hook_suffix = add_options_page(
			__( 'Blank Plugin', 'textdomain' ),
			__( 'Blank Plugin', 'textdomain' ),
			'manage_options',
			'Blank Plugin',
			array( $this, 'blank_plugin_menu_callback' )
		);

		add_action( "admin_print_scripts-{$page_hook_suffix}", array( $this, 'enqueue_option_page_scripts' ) );
	}

	/**
	 * Register Settings for Option page.
	 *
	 * @since    1.0.0
	 */
	public function blank_plugin_register_settings() {
		register_setting(
			'blank_plugin_settings',
			'blank_plugin_analytics_status',
			array(
				'type'         => 'boolean',
				'show_in_rest' => true,
				'default'      => false,
			)
		);

		register_setting(
			'blank_plugin_settings',
			'blank_plugin_analytics_key',
			array(
				'type'         => 'string',
				'show_in_rest' => true,
			)
		);
	}

}
