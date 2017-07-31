package rs.levi9.socbook2.exception;



public class ImportBookmarkException extends Exception {


	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ImportBookmarkException(String message) {
		this.message = message;
	}

}
