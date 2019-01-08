import { SqlErrorClass } from '../enums/sql-error-classes.enum';
import { QueryResultError } from '../interfaces/qurey-result-error.interface'
import { DbHttpError } from '../interfaces/db-http-error.interface';

export class DbErrorParser {
    public static createHttpErr(err: QueryResultError): number {
        const errClass = DbErrorParser.checkErrorClass(err.code);
        return DbErrorParser[SqlErrorClass[errClass]](err);
    }

    public static checkErrorClass(code: string): SqlErrorClass {
        const errorClass = code.slice(0, 2);
        switch (errorClass) {
            case '01':
                return SqlErrorClass.Warning;
            case '02':
                return SqlErrorClass.NoData;
            case '03':
                return SqlErrorClass.SQLStatementNotYetComplete;
            case '08':
                return SqlErrorClass.ConnectionException;
            case '09':
                return SqlErrorClass.TriggeredActionException;
            case '0A':
                return SqlErrorClass.FeatureNotSupported;
            case '0B':
                return SqlErrorClass.InvalidTransactionInitiation;
            case '0F':
                return SqlErrorClass.LocatorException;
            case '0L':
                return SqlErrorClass.InvalidGrantor;
            case '0P':
                return SqlErrorClass.InvalidRoleSpecification;
            case '0Z':
                return SqlErrorClass.DiagnosticsException;
            case '20':
                return SqlErrorClass.CaseNotFound;
            case '21':
                return SqlErrorClass.CardinalityViolation;
            case '22':
                return SqlErrorClass.DataException;
            case '23':
                return SqlErrorClass.IntegrityConstraintViolation;
            case '24':
                return SqlErrorClass.InvalidCursorState;
            case '25':
                return SqlErrorClass.InvalidTransactionState;
            case '26':
                return SqlErrorClass.InvalidSQLStatementName;
            case '27':
                return SqlErrorClass.TriggeredDataChangeViolation;
            case '28':
                return SqlErrorClass.InvalidAuthorizationSpecification;
            case '2B':
                return SqlErrorClass.DependentPrivilegeDescriptorsStillExist;
            case '2D':
                return SqlErrorClass.InvalidTransactionTermination;
            case '2F':
                return SqlErrorClass.InvalidCursorName;
            case '34':
                return SqlErrorClass.InvalidCursorName;
            case '38':
                return SqlErrorClass.ExternalRoutineException;
            case '39':
                return SqlErrorClass.ExternalRoutineInvocationException;
            case '3B':
                return SqlErrorClass.SavepointException;
            case '3D':
                return SqlErrorClass.InvalidCatalogName;
            case '3F':
                return SqlErrorClass.InvalidSchemaName;
            case '40':
                return SqlErrorClass.TransactionRollback;
            case '42':
                return SqlErrorClass.SyntaxErrorOrAccessRuleViolation;
            case '44':
                return SqlErrorClass.WITH_CHECK_OPTION_Violation;
            case '53':
                return SqlErrorClass.InsufficientResources;
            case '54':
                return SqlErrorClass.ProgramLimitExceeded;
            case '55':
                return SqlErrorClass.ObjectNotInPrerequisiteState;
            case '57':
                return SqlErrorClass.OperatorIntervention;
            case '58':
                return SqlErrorClass.SystemError;
            case 'F0':
                return SqlErrorClass.ConfigurationFileError;
            case 'HV':
                return SqlErrorClass.ForeignDataWrapperError;
            case 'P0':
                return SqlErrorClass.pgSQLError;
            case 'XX':
                return SqlErrorClass.InternalError;
        }
    }

    public static Warning(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '01000': return { code: null, description: 'Warning' }; // warning 
            case '0100C': return { code: null, description: 'Dynamic result sets returned' }; // dynamic_result_sets_returned 
            case '01008': return { code: null, description: 'Implicit zero bit padding' }; // implicit_zero_bit_padding 
            case '01003': return { code: null, description: 'Null value eliminated in set function' }; // null_value_eliminated_in_set_function 
            case '01007': return { code: null, description: 'Privilege not granted' }; // privilege_not_granted 
            case '01006': return { code: null, description: 'Privilege not revoked' }; // privilege_not_revoked 
            case '01004': return { code: null, description: 'String data right truncation' }; // string_data_right_truncation 
            case '01P01': return { code: null, description: 'Deprecated feature' }; // deprecated_feature 
        }
    }
    public static NoData(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '02000': return { code: null, description: 'No data' }; // no_data 
            case '02001': return { code: null, description: 'No additional dynamic result sets returned' }; // no_additional_dynamic_result_sets_returned 
        }
    }
    public static SQLStatementNotYetComplete(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '03000': return { code: null, description: 'Sql statement not yet complete' }; // sql_statement_not_yet_complete 
        }
    }
    public static ConnectionException(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '08000': return { code: 523, description: 'Connection exception' }; // connection_exception 
            case '08003': return { code: 523, description: 'Connection does not exist' }; // connection_does_not_exist 
            case '08006': return { code: 523, description: 'Connection failure' }; // connection_failure 
            case '08001': return { code: 523, description: 'Sqlclient unable to establish sqlconnection' }; // sqlclient_unable_to_establish_sqlconnection 
            case '08004': return { code: 523, description: 'Sqlserver rejected establishment of sqlconnection' }; // sqlserver_rejected_establishment_of_sqlconnection 
            case '08007': return { code: 523, description: 'Transaction resolution unknown' }; // transaction_resolution_unknown 
            case '08P01': return { code: 523, description: 'Protocol violation' }; // protocol_violation 
        }
    }
    public static TriggeredActionException(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '09000': return { code: null, description: 'Triggered action exception' }; // triggered_action_exception 
        }
    }
    public static FeatureNotSupported(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '0A000': return { code: null, description: 'Feature not supported' }; // feature_not_supported 
        }
    }
    public static InvalidTransactionInitiation(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '0B000': return { code: null, description: 'Invalid transaction initiation' }; // invalid_transaction_initiation 
        }
    }
    public static LocatorException(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '0F000': return { code: null, description: 'Locator exception' }; // locator_exception 
            case '0F001': return { code: null, description: 'Invalid locator specification' }; // invalid_locator_specification 
        }
    }
    public static InvalidGrantor(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '0L000': return { code: null, description: 'Invalid grantor' }; // invalid_grantor 
            case '0LP01': return { code: null, description: 'Invalid grant operation' }; // invalid_grant_operation 
        }
    }
    public static InvalidRoleSpecification(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '0P000': return { code: null, description: 'Invalid role specification' }; // invalid_role_specification 
        }
    }
    public static DiagnosticsException(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '0Z000': return { code: null, description: 'Diagnostics exception' }; // diagnostics_exception 
            case '0Z002': return { code: null, description: 'Stacked diagnostics accessed without active handler' }; // stacked_diagnostics_accessed_without_active_handler 
        }
    }
    public static CaseNotFound(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '20000': return { code: null, description: 'Case not found' }; // case_not_found 
        }
    }
    public static CardinalityViolation(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '21000': return { code: null, description: 'Cardinality violation' }; // cardinality_violation 
        }
    }
    public static DataException(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '22000': return { code: 400, description: 'Data exception' }; // data_exception 
            case '2202E': return { code: 400, description: 'Array subscript error' }; // array_subscript_error 
            case '22021': return { code: null, description: 'Character not in repertoire' }; // character_not_in_repertoire 
            case '22008': return { code: 400, description: 'Datetime field overflow' }; // datetime_field_overflow 
            case '22012': return { code: 400, description: 'Division by zero' }; // division_by_zero 
            case '22005': return { code: 400, description: 'Error in assignment' }; // error_in_assignment 
            case '2200B': return { code: null, description: 'Escape character conflict' }; // escape_character_conflict 
            case '22022': return { code: null, description: 'Indicator overflow' }; // indicator_overflow 
            case '22015': return { code: null, description: 'Interval field overflow' }; // interval_field_overflow 
            case '2201E': return { code: 400, description: 'Invalid argument for logarithm' }; // invalid_argument_for_logarithm 
            case '22014': return { code: 400, description: 'Invalid argument for ntile function' }; // invalid_argument_for_ntile_function 
            case '22016': return { code: 400, description: 'Invalid argument for nth value function' }; // invalid_argument_for_nth_value_function 
            case '2201F': return { code: 400, description: 'Invalid argument for power function' }; // invalid_argument_for_power_function 
            case '2201G': return { code: 400, description: 'Invalid argument for width bucket function' }; // invalid_argument_for_width_bucket_function 
            case '22018': return { code: null, description: 'Invalid character value for cast' }; // invalid_character_value_for_cast 
            case '22007': return { code: 400, description: 'Invalid datetime format' }; // invalid_datetime_format 
            case '22019': return { code: null, description: 'Invalid escape character' }; // invalid_escape_character 
            case '2200D': return { code: null, description: 'Invalid escape octet' }; // invalid_escape_octet 
            case '22025': return { code: null, description: 'Invalid escape sequence' }; // invalid_escape_sequence 
            case '22P06': return { code: null, description: 'Nonstandard use of escape character' }; // nonstandard_use_of_escape_character 
            case '22010': return { code: null, description: 'Invalid indicator parameter value' }; // invalid_indicator_parameter_value 
            case '22023': return { code: null, description: 'Invalid parameter value' }; // invalid_parameter_value 
            case '2201B': return { code: 500, description: 'Invalid regular expression' }; // invalid_regular_expression 
            case '2201W': return { code: 416, description: 'Invalid row count in limit clause' }; // invalid_row_count_in_limit_clause 
            case '2201X': return { code: 416, description: 'Invalid row count in result offset clause' }; // invalid_row_count_in_result_offset_clause 
            case '22009': return { code: 416, description: 'Invalid time zone displacement value' }; // invalid_time_zone_displacement_value 
            case '2200C': return { code: 500, description: 'Invalid use of escape character' }; // invalid_use_of_escape_character 
            case '2200G': return { code: 400, description: 'Most specific type mismatch' }; // most_specific_type_mismatch 
            case '22004': return { code: 400, description: 'Null value not allowed' }; // null_value_not_allowed 
            case '22002': return { code: 400, description: 'Null value no indicator parameter' }; // null_value_no_indicator_parameter 
            case '22003': return { code: 400, description: 'Numeric value out of range' }; // numeric_value_out_of_range 
            case '22026': return { code: 400, description: 'String data length mismatch' }; // string_data_length_mismatch 
            case '22001': return { code: null, description: 'String data right truncation' }; // string_data_right_truncation 
            case '22011': return { code: 500, description: 'Substring error' }; // substring_error 
            case '22027': return { code: 500, description: 'Trim error' }; // trim_error 
            case '22024': return { code: null, description: 'Unterminated c string' }; // unterminated_c_string 
            case '2200F': return { code: 400, description: 'Zero length character string' }; // zero_length_character_string 
            case '22P01': return { code: 400, description: 'Floating point exception' }; // floating_point_exception 
            case '22P02': return { code: null, description: 'Invalid text representation' }; // invalid_text_representation 
            case '22P03': return { code: null, description: 'Invalid binary representation' }; // invalid_binary_representation 
            case '22P04': return { code: null, description: 'Bad copy file format' }; // bad_copy_file_format 
            case '22P05': return { code: null, description: 'Untranslatable character' }; // untranslatable_character 
            case '2200L': return { code: 415, description: 'Not an xml document' }; // not_an_xml_document 
            case '2200M': return { code: 415, description: 'Invalid xml document' }; // invalid_xml_document 
            case '2200N': return { code: 415, description: 'Invalid xml content' }; // invalid_xml_content 
            case '2200S': return { code: 415, description: 'Invalid xml comment' }; // invalid_xml_comment 
            case '2200T': return { code: 415, description: 'Invalid xml processing instruction' }; // invalid_xml_processing_instruction 
        }
    }
    public static IntegrityConstraintViolation(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '23000': return { code: null, description: 'Integrity constraint violation' }; // integrity_constraint_violation 
            case '23001': return { code: null, description: 'Restrict violation' }; // restrict_violation 
            case '23502': return { code: null, description: 'Not null violation' }; // not_null_violation 
            case '23503': return { code: null, description: 'Foreign key violation' }; // foreign_key_violation 
            case '23505': return { code: 409, description: 'Unique violation' }; // unique_violation 
            case '23514': return { code: null, description: 'Check violation' }; // check_violation 
            case '23P01': return { code: 409, description: 'Exclusion violation' }; // exclusion_violation 
        }
    }
    public static InvalidCursorState(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '24000': return { code: null, description: 'Invalid cursor state' }; // invalid_cursor_state 
        }
    }
    public static InvalidTransactionState(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '25000': return { code: 500, description: 'Invalid transaction state' }; // invalid_transaction_state 
            case '25001': return { code: 500, description: 'Active sql transaction' }; // active_sql_transaction 
            case '25002': return { code: null, description: 'Branch transaction already active' }; // branch_transaction_already_active 
            case '25008': return { code: null, description: 'Held cursor requires same isolation level' }; // held_cursor_requires_same_isolation_level 
            case '25003': return { code: null, description: 'Inappropriate access mode for branch transaction' }; // inappropriate_access_mode_for_branch_transaction 
            case '25004': return { code: null, description: 'Inappropriate isolation level for branch transaction' }; // inappropriate_isolation_level_for_branch_transaction 
            case '25005': return { code: null, description: 'No active sql transaction for branch transaction' }; // no_active_sql_transaction_for_branch_transaction 
            case '25006': return { code: null, description: 'Read only sql transaction' }; // read_only_sql_transaction 
            case '25007': return { code: null, description: 'Schema and data statement mixing not supported' }; // schema_and_data_statement_mixing_not_supported 
            case '25P01': return { code: null, description: 'No active sql transaction' }; // no_active_sql_transaction 
            case '25P02': return { code: null, description: 'In failed sql transaction' }; // in_failed_sql_transaction 
        }
    }
    public static InvalidSQLStatementName(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '26000': return { code: null, description: 'Invalid sql statement name' }; // invalid_sql_statement_name 
        }
    }
    public static TriggeredDataChangeViolation(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '27000': return { code: null, description: 'Triggered data change violation' }; // triggered_data_change_violation 
        }
    }
    public static InvalidAuthorizationSpecification(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '28000': return { code: 500, description: 'Invalid authorization specification' }; // invalid_authorization_specification 
            case '28P01': return { code: 500, description: 'Invalid password' }; // invalid_password 
        }
    }
    public static DependentPrivilegeDescriptorsStillExist(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '2B000': return { code: 500, description: 'Dependent privilege descriptors still exist' }; // dependent_privilege_descriptors_still_exist 
            case '2BP01': return { code: 500, description: 'Dependent objects still exist' }; // dependent_objects_still_exist 
        }
    }
    public static InvalidTransactionTermination(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '2D000': return { code: 500, description: 'Invalid transaction termination' }; // invalid_transaction_termination 
        }
    }
    public static SQLRoutineException(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '2F000': return { code: null, description: 'Sql routine exception' }; // sql_routine_exception 
            case '2F005': return { code: null, description: 'Function executed no return statement' }; // function_executed_no_return_statement 
            case '2F002': return { code: null, description: 'Modifying sql data not permitted' }; // modifying_sql_data_not_permitted 
            case '2F003': return { code: null, description: 'Prohibited sql statement attempted' }; // prohibited_sql_statement_attempted 
            case '2F004': return { code: null, description: 'Reading sql data not permitted' }; // reading_sql_data_not_permitted 
        }
    }
    public static InvalidCursorName(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '34000': return { code: null, description: 'Invalid cursor name' }; // invalid_cursor_name 
        }
    }
    public static ExternalRoutineException(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '38000': return { code: null, description: 'External routine exception' }; // external_routine_exception 
            case '38001': return { code: null, description: 'Containing sql not permitted' }; // containing_sql_not_permitted 
            case '38002': return { code: null, description: 'Modifying sql data not permitted' }; // modifying_sql_data_not_permitted 
            case '38003': return { code: null, description: 'Prohibited sql statement attempted' }; // prohibited_sql_statement_attempted 
            case '38004': return { code: null, description: 'Reading sql data not permitted' }; // reading_sql_data_not_permitted 
        }
    }
    public static ExternalRoutineInvocationException(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '39000': return { code: 500, description: 'External routine invocation exception' }; // external_routine_invocation_exception 
            case '39001': return { code: 500, description: 'Invalid sqlstate returned' }; // invalid_sqlstate_returned 
            case '39004': return { code: 500, description: 'Null value not allowed' }; // null_value_not_allowed 
            case '39P01': return { code: 500, description: 'Trigger protocol violated' }; // trigger_protocol_violated 
            case '39P02': return { code: 500, description: 'Srf protocol violated' }; // srf_protocol_violated 
        }
    }
    public static SavepointException(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '3B000': return { code: null, description: 'Savepoint exception' }; // savepoint_exception 
            case '3B001': return { code: null, description: 'Invalid savepoint specification' }; // invalid_savepoint_specification 
        }
    }
    public static InvalidCatalogName(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '3D000': return { code: 500, description: 'Invalid catalog name' }; // invalid_catalog_name 
        }
    }
    public static InvalidSchemaName(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '3F000': return { code: 500, description: 'Invalid schema name' }; // invalid_schema_name 
        }
    }
    public static TransactionRollback(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '40000': return { code: null, description: 'Transaction rollback' }; // transaction_rollback 
            case '40002': return { code: null, description: 'Transaction integrity constraint violation' }; // transaction_integrity_constraint_violation 
            case '40001': return { code: null, description: 'Serialization failure' }; // serialization_failure 
            case '40003': return { code: null, description: 'Statement completion unknown' }; // statement_completion_unknown 
            case '40P01': return { code: null, description: 'Deadlock detected' }; // deadlock_detected 
        }
    }
    public static SyntaxErrororAccessRuleViolation(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '42000': return { code: null, description: 'Syntax error or access rule violation' }; // syntax_error_or_access_rule_violation 
            case '42601': return { code: null, description: 'Syntax error' }; // syntax_error 
            case '42501': return { code: null, description: 'Insufficient privilege' }; // insufficient_privilege 
            case '42846': return { code: null, description: 'Cannot coerce' }; // cannot_coerce 
            case '42803': return { code: null, description: 'Grouping error' }; // grouping_error 
            case '42P20': return { code: null, description: 'Windowing error' }; // windowing_error 
            case '42P19': return { code: null, description: 'Invalid recursion' }; // invalid_recursion 
            case '42830': return { code: null, description: 'Invalid foreign key' }; // invalid_foreign_key 
            case '42602': return { code: null, description: 'Invalid name' }; // invalid_name 
            case '42622': return { code: null, description: 'Name too long' }; // name_too_long 
            case '42939': return { code: null, description: 'Reserved name' }; // reserved_name 
            case '42804': return { code: null, description: 'Datatype mismatch' }; // datatype_mismatch 
            case '42P18': return { code: null, description: 'Indeterminate datatype' }; // indeterminate_datatype 
            case '42P21': return { code: null, description: 'Collation mismatch' }; // collation_mismatch 
            case '42P22': return { code: null, description: 'Indeterminate collation' }; // indeterminate_collation 
            case '42809': return { code: null, description: 'Wrong object type' }; // wrong_object_type 
            case '42703': return { code: null, description: 'Undefined column' }; // undefined_column 
            case '42883': return { code: null, description: 'Undefined function' }; // undefined_function 
            case '42P01': return { code: null, description: 'Undefined table' }; // undefined_table 
            case '42P02': return { code: null, description: 'Undefined parameter' }; // undefined_parameter 
            case '42704': return { code: null, description: 'Undefined object' }; // undefined_object 
            case '42701': return { code: null, description: 'Duplicate column' }; // duplicate_column 
            case '42P03': return { code: null, description: 'Duplicate cursor' }; // duplicate_cursor 
            case '42P04': return { code: null, description: 'Duplicate database' }; // duplicate_database 
            case '42723': return { code: null, description: 'Duplicate function' }; // duplicate_function 
            case '42P05': return { code: null, description: 'Duplicate prepared statement' }; // duplicate_prepared_statement 
            case '42P06': return { code: null, description: 'Duplicate schema' }; // duplicate_schema 
            case '42P07': return { code: null, description: 'Duplicate table' }; // duplicate_table 
            case '42712': return { code: null, description: 'Duplicate alias' }; // duplicate_alias 
            case '42710': return { code: null, description: 'Duplicate object' }; // duplicate_object 
            case '42702': return { code: null, description: 'Ambiguous column' }; // ambiguous_column 
            case '42725': return { code: null, description: 'Ambiguous function' }; // ambiguous_function 
            case '42P08': return { code: null, description: 'Ambiguous parameter' }; // ambiguous_parameter 
            case '42P09': return { code: null, description: 'Ambiguous alias' }; // ambiguous_alias 
            case '42P10': return { code: null, description: 'Invalid column reference' }; // invalid_column_reference 
            case '42611': return { code: null, description: 'Invalid column definition' }; // invalid_column_definition 
            case '42P11': return { code: null, description: 'Invalid cursor definition' }; // invalid_cursor_definition 
            case '42P12': return { code: null, description: 'Invalid database definition' }; // invalid_database_definition 
            case '42P13': return { code: null, description: 'Invalid function definition' }; // invalid_function_definition 
            case '42P14': return { code: null, description: 'Invalid prepared statement definition' }; // invalid_prepared_statement_definition 
            case '42P15': return { code: null, description: 'Invalid schema definition' }; // invalid_schema_definition 
            case '42P16': return { code: null, description: 'Invalid table definition' }; // invalid_table_definition 
            case '42P17': return { code: null, description: 'Invalid object definition' }; // invalid_object_definition 
        }
    }
    public static WITHCHECKOPTIONViolation(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '44000': return { code: null, description: 'With check option violation' }; // with_check_option_violation 
        }
    }
    public static InsufficientResources(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '53000': return { code: 503, description: 'Insufficient resources' }; // insufficient_resources 
            case '53100': return { code: 507, description: 'Disk full' }; // disk_full 
            case '53200': return { code: 503, description: 'Out of memory' }; // out_of_memory 
            case '53300': return { code: 523, description: 'Too many connections' }; // too_many_connections 
            case '53400': return { code: 523, description: 'Configuration limit exceeded' }; // configuration_limit_exceeded 
        }
    }
    public static ProgramLimitExceeded(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '54000': return { code: null, description: 'Program limit exceeded' }; // program_limit_exceeded 
            case '54001': return { code: null, description: 'Statement too complex' }; // statement_too_complex 
            case '54011': return { code: null, description: 'Too many columns' }; // too_many_columns 
            case '54023': return { code: null, description: 'Too many arguments' }; // too_many_arguments 
        }
    }
    public static ObjectNotInPrerequisiteState(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '55000': return { code: null, description: 'Object not in prerequisite state' }; // object_not_in_prerequisite_state 
            case '55006': return { code: null, description: 'Object in use' }; // object_in_use 
            case '55P02': return { code: null, description: 'Cant change runtime param' }; // cant_change_runtime_param 
            case '55P03': return { code: null, description: 'Lock not available' }; // lock_not_available 
        }
    }
    public static OperatorIntervention(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '57000': return { code: null, description: 'Operator intervention' }; // operator_intervention 
            case '57014': return { code: null, description: 'Query canceled' }; // query_canceled 
            case '57P01': return { code: null, description: 'Admin shutdown' }; // admin_shutdown 
            case '57P02': return { code: null, description: 'Crash shutdown' }; // crash_shutdown 
            case '57P03': return { code: 523, description: 'Cannot connect now' }; // cannot_connect_now 
            case '57P04': return { code: null, description: 'Database dropped' }; // database_dropped 
        }
    }
    public static SystemError(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case '58000': return { code: null, description: 'System error' }; // system_error 
            case '58030': return { code: null, description: 'Io error' }; // io_error 
            case '58P01': return { code: null, description: 'Undefined file' }; // undefined_file 
            case '58P02': return { code: null, description: 'Duplicate file' }; // duplicate_file 
        }
    }
    public static ConfigurationFileError(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case 'F0000': return { code: null, description: 'Config file error' }; // config_file_error 
            case 'F0001': return { code: null, description: 'Lock file exists' }; // lock_file_exists 
        }
    }
    public static ForeignDataWrapperError(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case 'HV000': return { code: null, description: 'Fdw error' }; // fdw_error 
            case 'HV005': return { code: null, description: 'Fdw column name not found' }; // fdw_column_name_not_found 
            case 'HV002': return { code: null, description: 'Fdw dynamic parameter value needed' }; // fdw_dynamic_parameter_value_needed 
            case 'HV010': return { code: null, description: 'Fdw function sequence error' }; // fdw_function_sequence_error 
            case 'HV021': return { code: null, description: 'Fdw inconsistent descriptor information' }; // fdw_inconsistent_descriptor_information 
            case 'HV024': return { code: null, description: 'Fdw invalid attribute value' }; // fdw_invalid_attribute_value 
            case 'HV007': return { code: null, description: 'Fdw invalid column name' }; // fdw_invalid_column_name 
            case 'HV008': return { code: null, description: 'Fdw invalid column number' }; // fdw_invalid_column_number 
            case 'HV004': return { code: null, description: 'Fdw invalid data type' }; // fdw_invalid_data_type 
            case 'HV006': return { code: null, description: 'Fdw invalid data type descriptors' }; // fdw_invalid_data_type_descriptors 
            case 'HV091': return { code: null, description: 'Fdw invalid descriptor field identifier' }; // fdw_invalid_descriptor_field_identifier 
            case 'HV00B': return { code: null, description: 'Fdw invalid handle' }; // fdw_invalid_handle 
            case 'HV00C': return { code: null, description: 'Fdw invalid option index' }; // fdw_invalid_option_index 
            case 'HV00D': return { code: null, description: 'Fdw invalid option name' }; // fdw_invalid_option_name 
            case 'HV090': return { code: null, description: 'Fdw invalid string length or buffer length' }; // fdw_invalid_string_length_or_buffer_length 
            case 'HV00A': return { code: null, description: 'Fdw invalid string format' }; // fdw_invalid_string_format 
            case 'HV009': return { code: null, description: 'Fdw invalid use of null pointer' }; // fdw_invalid_use_of_null_pointer 
            case 'HV014': return { code: null, description: 'Fdw too many handles' }; // fdw_too_many_handles 
            case 'HV001': return { code: null, description: 'Fdw out of memory' }; // fdw_out_of_memory 
            case 'HV00P': return { code: null, description: 'Fdw no schemas' }; // fdw_no_schemas 
            case 'HV00J': return { code: null, description: 'Fdw option name not found' }; // fdw_option_name_not_found 
            case 'HV00K': return { code: null, description: 'Fdw reply handle' }; // fdw_reply_handle 
            case 'HV00Q': return { code: null, description: 'Fdw schema not found' }; // fdw_schema_not_found 
            case 'HV00R': return { code: null, description: 'Fdw table not found' }; // fdw_table_not_found 
            case 'HV00L': return { code: null, description: 'Fdw unable to create execution' }; // fdw_unable_to_create_execution 
            case 'HV00M': return { code: null, description: 'Fdw unable to create reply' }; // fdw_unable_to_create_reply 
            case 'HV00N': return { code: null, description: 'Fdw unable to establish connection' }; // fdw_unable_to_establish_connection 
        }
    }
    public static pgSQLError(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case 'P0000': return { code: null, description: 'Plpgsql error' }; // plpgsql_error 
            case 'P0001': return { code: null, description: 'Raise exception' }; // raise_exception 
            case 'P0002': return { code: null, description: 'No data found' }; // no_data_found 
            case 'P0003': return { code: null, description: 'Too many rows' }; // too_many_rows 
        }
    }
    public static InternalError(err: QueryResultError): DbHttpError {
        switch (err.code) {
            case 'XX000': return { code: null, description: 'Internal error' }; // internal_error 
            case 'XX001': return { code: null, description: 'Data corrupted' }; // data_corrupted 
            case 'XX002': return { code: null, description: 'Index corrupted' }; // index_corrupted 
        }
    }
}