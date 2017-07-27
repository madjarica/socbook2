package rs.levi9.socbook2.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "bookmark")
public class Bookmark extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -4781514238958474034L;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private BookmarkUser bookmarkUser;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;
		
	@ManyToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
	@JoinTable(joinColumns = @JoinColumn(name = "bookmark_id"),
	inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private Set<Tag> tag;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name="bookmark_id")
	private Set<Comment> comment;

	@Column(nullable = false)
	@NotNull
	@DateTimeFormat
	private Date createdDate;
	
	@Column(nullable = false)
	@NotNull	
	private boolean visible;
	
	@Column(nullable = false)
	@NotNull
	private String title;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	@NotNull
	private String description;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	@NotNull
	private String url;
	
	public Bookmark() {}

	public Bookmark(BookmarkUser bookmarkUser, Category category, Set<Tag> tag, Date createdDate, boolean visible, String title, String description, String url, Set<Comment> comment) {
		this.bookmarkUser = bookmarkUser;
		this.category = category;
		this.tag = tag;
		this.createdDate = createdDate;
		this.visible = visible;
		this.title = title;
		this.description = description;
		this.url = url;
		this.comment = comment;
		}

	public BookmarkUser getBookmarkUser() {
		return bookmarkUser;
	}


	public void setBookmarkUser(BookmarkUser bookmarkUser) {
		this.bookmarkUser = bookmarkUser;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

	public Set<Comment> getComment() {
		return comment;
	}

	public void setComment(Set<Comment> comment) {
		this.comment = comment;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}		
	
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Set<Tag> getTag() {
		return tag;
	}

	public void setTag(Set<Tag> tag) {
		this.tag = tag;
	}
}
