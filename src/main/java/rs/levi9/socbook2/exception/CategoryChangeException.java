package rs.levi9.socbook2.exception;

public class CategoryChangeException extends Exception{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public CategoryChangeException(String message) {
		this.message = message;
	}

}
